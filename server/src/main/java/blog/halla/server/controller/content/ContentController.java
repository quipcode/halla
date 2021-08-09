package blog.halla.server.controller.content;

import blog.halla.server.models.User;
import blog.halla.server.models.content.Content;
import blog.halla.server.payload.request.content.CreationRequest;
import blog.halla.server.payload.response.MessageResponse;
import blog.halla.server.repository.content.ContentRepository;
import blog.halla.server.repository.security.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.UUID;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/content")
public class ContentController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    ContentRepository contentRepository;

    @PostMapping("/new")
    public ResponseEntity<?> createNewContent(@Valid @RequestBody CreationRequest creationRequest){
        Content content = new Content(creationRequest.getTitle(), creationRequest.getContent());
        Long author_id = creationRequest.getAuthor_id();
        User author = null;
        Content parent = null;
        String parent_uuid = creationRequest.getParent_uuid();
        if(author_id == null){
            throw new RuntimeException("Error: Author_id required");
        }else{
            author = userRepository.getById(author_id);
        }
        if(parent_uuid != null){
            parent = contentRepository.getById(parent_uuid);
        }

        content.setAuthor_id(author);
        content.setParent(parent);
        contentRepository.save(content);
        return ResponseEntity.ok(new MessageResponse("content saved successfully believe it"));
    }
}
