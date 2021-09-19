package blog.halla.server.controller;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import blog.halla.server.controller.content.ContentController;
import blog.halla.server.payload.request.auth.SelfRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import blog.halla.server.models.ERole;
import blog.halla.server.models.Role;
import blog.halla.server.models.User;

import blog.halla.server.repository.security.UserRepository;
import blog.halla.server.repository.security.RoleRepository;

import blog.halla.server.services.UserDetailsImpl;
import blog.halla.server.security.jwt.JwtUtils;

import blog.halla.server.payload.request.auth.LoginRequest;
import blog.halla.server.payload.request.auth.SignupRequest;

import blog.halla.server.payload.response.JwtResponse;
import blog.halla.server.payload.response.MessageResponse;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    Logger logger = LoggerFactory.getLogger(ContentController.class);

    @GetMapping("/self")
    public ResponseEntity<?> getSelfUser(HttpServletRequest request) throws IOException {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Object authContext = SecurityContextHolder.getContext().getAuthentication();
        final String authorizationHeader = request.getHeader("Authorization");
        String token = authorizationHeader.replace("Bearer ","");
        String body = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
        if(!body.startsWith("{\"username\": ")){
            return ResponseEntity.status(400).body(new MessageResponse("Please provide request body as directed"));
        }
        ObjectMapper mapper = new ObjectMapper();
        SelfRequest selfRequest = mapper.readValue(body, SelfRequest.class);
         if(authContext instanceof AnonymousAuthenticationToken){
             return ResponseEntity.status(401).body(new MessageResponse("Please login"));
         }
        String authenticatedUsername = null;
        if (principal instanceof UserDetailsImpl) {
            authenticatedUsername  = ((UserDetailsImpl) principal).getUsername();
        }
        String providedUsername = selfRequest.getUsername();
        if(authenticatedUsername.equals(providedUsername)){
            UserDetailsImpl userDetails = (UserDetailsImpl) principal;
            List<String> permissions = userDetails.getAuthorities().stream()
                    .map(item -> item.getAuthority())
                    .collect(Collectors.toList());

            List<String> roles = userDetails.getRoles().stream()
                    .map(role -> role.toString())
                    .collect(Collectors.toList());

            return ResponseEntity.ok(new JwtResponse(
                    token,
                    userDetails.getId(),
                    userDetails.getUsername(),
                    userDetails.getEmail(),
                    roles,
                    permissions));
        }else{
            return ResponseEntity.status(404).body(new MessageResponse("User not found"));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        List<String> permissions = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        List<String> roles = userDetails.getRoles().stream()
                .map(role -> role.toString())
                .collect(Collectors.toList());

        return ResponseEntity.ok( new JwtResponse(
                jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles,
                permissions));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest){
        if(userRepository.existsByUsername(signupRequest.getUsername())){
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken"));
        }
        if(userRepository.existsByEmail(signupRequest.getEmail())){
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use"));
        }

        User user = new User(signupRequest.getUsername(),
                signupRequest.getEmail(),
                encoder.encode(signupRequest.getPassword()));
        Set<String> strRoles = signupRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if(strRoles == null){

            Role userRole = roleRepository.findByName(ERole.DEFAULT_USER.toString())
                    .orElseThrow(() ->new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        }else{
            strRoles.forEach(role -> {
                switch (role){
                    case "DEFAULT_SYS_ADMIN":
                        Role adminRole = roleRepository.findByName(ERole.DEFAULT_SYS_ADMIN.toString())
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);
                        break;
                    case "DEFAULT_MANAGER":
                        Role managerRole = roleRepository.findByName(ERole.DEFAULT_MANAGER.toString())
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(managerRole);
                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.DEFAULT_USER.toString())
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }
        user.setRoles(roles);
        userRepository.save(user);
        return ResponseEntity.ok(new MessageResponse("User registered successfully"));
    }

}
