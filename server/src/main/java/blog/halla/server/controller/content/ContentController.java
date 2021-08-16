package blog.halla.server.controller.content;

import blog.halla.server.models.User;
import blog.halla.server.models.content.Content;
import blog.halla.server.payload.request.content.ContentRequest;
import blog.halla.server.payload.request.content.CreationRequest;
import blog.halla.server.payload.response.MessageResponse;
import blog.halla.server.repository.content.ContentRepository;
import blog.halla.server.repository.security.UserRepository;
import blog.halla.server.services.content.ContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/content")
public class ContentController {
    @Autowired
    private ContentService contentService;
    @Autowired
    UserRepository userRepository;

    @Autowired
    ContentRepository contentRepository;
    
    @DeleteMapping("/delete/{uuid}")
    public ResponseEntity<?> deleteContent(@PathVariable("uuid")String uuid){
        contentRepository.deleteById(uuid);
        return ResponseEntity.ok(new MessageResponse("content has been deleted"));
    }

    @PutMapping("/update/{uuid}")
    public ResponseEntity<?> updateContent(@Valid @RequestBody ContentRequest contentRequest, @PathVariable("uuid") String uuid){
        Optional<Content> contentServed = contentService.getContent(uuid);
        String parent_uuid = contentRequest.getParent_uuid();
        Content content = contentServed.get();
        User author = userRepository.getById(contentRequest.getAuthor_id());


        if(parent_uuid != null){
            Content parent_content = contentRepository.getById(parent_uuid);
            content.setParent(parent_content);
        }

        content.setAuthor_id(author);
        content.setTitle(contentRequest.getTitle());
        content.setContent(contentRequest.getContent());
        contentService.updateContent(uuid, content);

        return ResponseEntity.ok(new MessageResponse("content has been updated"));
    }

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
