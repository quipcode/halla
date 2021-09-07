package blog.halla.server.controller.content;

import blog.halla.server.models.User;
import blog.halla.server.models.content.Content;
import blog.halla.server.models.content_section.ContentSection;
import blog.halla.server.payload.request.content.ContentRequest;
import blog.halla.server.payload.request.content.CreationRequest;
import blog.halla.server.payload.response.MessageResponse;
import blog.halla.server.repository.content.ContentRepository;
import blog.halla.server.repository.content_section.ContentSectionRepository;
import blog.halla.server.repository.security.UserRepository;
import blog.halla.server.services.UserDetailsImpl;
import blog.halla.server.services.content.ContentService;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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

    @Autowired
    ContentSectionRepository contentSectionRepository;

    Logger logger = LoggerFactory.getLogger(ContentController.class);

    @GetMapping("/")
    public Page<Content> getAllContent(Pageable pageable) {
        return contentRepository.findAll(pageable);
//                .filter(content -> !content.isPublished());

    }

    @GetMapping("/user/{authorId}")
    public Page<Content> getAllUserContent(@PathVariable("authorId") Long authorId, Pageable pageable){
        User author = userRepository.getById(authorId);

//        final var contentOptional = contentRepository.findByTitle("some-title");
//        contentOptional.ifPresent(content -> {
//            content.getParent()
//        });
//        var summary = contentRepository.findByTitle("some-title")
//                .
//                .map(Content::getSummary);



        return contentRepository.findByAuthorId(author, pageable);
    }

    @GetMapping("/{uuid}")

//    public Page<Content>
    public ResponseEntity<Map<String, Object>> getContentByUuid(@PathVariable("uuid") String uuid, Pageable pageable) {
//        return contentRepository.findByUuid( uuid ,pageable);
//        contentService.getContentById(uuid);
        return ResponseEntity.ok().body(contentService.getContentById(uuid));
    }

    
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
        Long author_id = author.getId();

        if(parent_uuid != null){
            Content parent_content = contentRepository.getById(parent_uuid);
            content.setParent(parent_content);
        }

        content.setAuthorId(author.getId());

//        content.setTitle(contentRequest.getTitle());
//        content.setContent(contentRequest.getContent());
        contentService.updateContent(uuid, content);

        return ResponseEntity.ok(new MessageResponse("content has been updated"));
    }

//    @PostMapping("/new")
//    public ResponseEntity<?> createContent(@Valid @RequestBody Content content) {
//        Set< ContentSection > contentSections =  content.getContentSections();
//        contentRepository.save(content.getUuid()).map(content - > {
//            contentSections.stream().map(contentSection -> {
//                contentSection.setContent_uuid(content.getUuid();
//                return contentSectionRepository.save(contentSection);
//            })
//        });
//    }
    @PostMapping("")
    public ResponseEntity<?> createNewContent(@Valid @RequestBody CreationRequest creationRequest){
        Content content = new Content();
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long author_id  = null;
        if (principal instanceof UserDetailsImpl) {
            author_id  = ((UserDetailsImpl) principal).getId();
        }
        User author = null;
        Content parent = null;
        String parent_uuid = creationRequest.getParent_uuid();
        String uuid = creationRequest.getUuid();
        if(author_id == null){
            throw new RuntimeException("Error: Author_id required");
        }else{
            author = userRepository.getById(author_id);
        }
        if(parent_uuid != null){
            parent = contentRepository.getById(parent_uuid);
        }
        if(uuid != null){
           content.setUuid(uuid);
        }

        content.setPublished(false);
        content.setAuthorId(author.getId());
        content.setParent(parent);
        Set< ContentSection > contentSections =  creationRequest.getContentSections();
//        ContentSection newContentSection = ContentSection();
        logger.error("content Sections: {}", contentSections);

        Content content2 = contentRepository.save(content);
        contentSections.forEach(section -> {
//            section.setContentUuid(content2);

            contentSectionRepository.save(section);
        });
        return ResponseEntity.ok("Content saved");

//                map(content - > {
//                contentSections.stream().map(contentSection -> {
//                    contentSection.setContent_uuid(content.getUuid();
//                    return contentSectionRepository.save(contentSection);
//                })
//        });


//        contentRepository.save(content);
//        logger.error("wtf", contentSections.stream().count());
//        logger.error(String.valueOf(contentSections.size()));
//        List<ContentSection> listContentSection = new ArrayList<ContentSection>();
//        listContentSection.addAll(contentSections);
//
//
//        List<JSONObject> entities = new ArrayList<JSONObject>();
//        for (ContentSection n : listContentSection) {
//            JSONObject Entity = new JSONObject();
//            entity.put("id", n.getId());
//            entity.put("address", n.getAddress());
//            entities.add(entity);
//        }
//        return ResponseEntity.ok().body(Set<ContentSection> contentSections);
//        contentSections.stream(con -> {
//            logger.error(con -);
//
//        });
//        logger.error(contentSections);
//            contentSections.stream().map(contentSection -> {
//                logger.error("contentsection title" + contentSection.getTitle().toString());
//                logger.error("contentsection sectiontype" + contentSection.getSectionType().toString());
//                logger.error("contentsection uuid" + contentSection.getUuid());
//                logger.debug("u seeing this");
//
//                contentSection.setContent_uuid(content);
//                return contentSectionRepository.save(contentSection);
//            });
//        return ResponseEntity.ok(new MessageResponse("content saved successfully believe it"));
    }
}
