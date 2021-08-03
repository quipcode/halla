package blog.halla.server.controller.content;

import blog.halla.server.models.content.Content;
import blog.halla.server.payload.request.content.CreationRequest;
import blog.halla.server.payload.response.MessageResponse;
import blog.halla.server.repository.content.ContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/content")
public class ContentController {
    @Autowired
    ContentRepository contentRepository;

    @PostMapping("/new")
    public ResponseEntity<?> createNewContent(@Valid @RequestBody CreationRequest creationRequest){
        Content content = new Content(creationRequest.getTitle(), creationRequest.getContent());
        contentRepository.save(content);
        return ResponseEntity.ok(new MessageResponse("content saved successfully believe it"));
    }
}
