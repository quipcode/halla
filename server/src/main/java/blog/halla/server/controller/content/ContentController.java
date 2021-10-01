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
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import java.io.DataInput;
import java.io.IOException;
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

    @Autowired
    private ObjectMapper objectMapper;

    Logger logger = LoggerFactory.getLogger(ContentController.class);

    @GetMapping("/")
    public List<Content> getAllContent(Pageable pageable) {
        Page<Content> stuff = contentRepository.findAll(pageable);
        List<Content> stuffing = contentRepository.findAll();
//        logger.error(stuff.toString());
//        logger.error(stuffing.toString());
        for(Content s : stuffing){
            logger.error(s.toString());
        }
        return stuffing;
//                .filter(content -> !content.isPublished());

    }

    @GetMapping("/user/{authorId}")
    public Page<Content> getAllUserContent(@PathVariable("authorId") Long authorId, Pageable pageable){
//        User author = userRepository.getById(authorId);

//        final var contentOptional = contentRepository.findByTitle("some-title");
//        contentOptional.ifPresent(content -> {
//            content.getParent()
//        });
//        var summary = contentRepository.findByTitle("some-title")
//                .
//                .map(Content::getSummary);



        return contentRepository.findByAuthorId(authorId, pageable);
    }

    @GetMapping("/{uuid}")

//    public Page<Content>
    public ResponseEntity<?> getContentByUuid(@PathVariable("uuid") String uuid, Pageable pageable) {
//        return contentRepository.findByUuid( uuid ,pageable);
//        contentService.getContentById(uuid);
//        return ResponseEntity.ok().body(contentService.getContentById(uuid));
        return ResponseEntity.ok().body(contentService.getContent(uuid));
    }

    
    @DeleteMapping("/delete/{uuid}")
    public ResponseEntity<?> deleteContent(@PathVariable("uuid")String uuid){
        contentRepository.deleteById(uuid);
        return ResponseEntity.ok(new MessageResponse("content has been deleted"));
    }

    @PutMapping("/{uuid}")
//    public ResponseEntity<?> updateContent(@Valid @RequestBody ContentRequest contentRequest, @PathVariable("uuid") String uuid) throws JsonMappingException, JsonProcessingException{
        public ResponseEntity<?> updateContent(@Valid @RequestBody Content contentRequest, @PathVariable("uuid") String uuid) throws JsonMappingException, JsonProcessingException {
//        Content content  = objectMapper.readValue(contentRequest, Content.class);
        Optional<Content> contentStored = contentService.getContent(uuid);
        Content content = contentStored.get();

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long author_id  = null;
        if (principal instanceof UserDetailsImpl) {
            author_id  = ((UserDetailsImpl) principal).getId();
        }
        String parent_uuid = "";
        parent_uuid = contentRequest.getParent().getUuid();
        if(parent_uuid != null){
            Content parent_content = contentRepository.getById(parent_uuid);
            content.setParent(parent_content);
        }

        List<ContentSection> cSections = contentRequest.getContentSections();
        if(cSections != null){
            List<ContentSection> cSectionList = new ArrayList<ContentSection>();
            for(ContentSection cSection : cSections){
                ContentSection curCSection = contentSectionRepository.getById(cSection.getUuid());
//                        contentSection.getOne(cSection.getId());
                curCSection.setTitle(cSection.getTitle());
                curCSection.setSummary(cSection.getSummary());
                curCSection.setIsTitleSelected(cSection.getIsTitleSelected());
                curCSection.setIsSummarySelected(cSection.getIsSummarySelected());
//                curCSection.setIsVisible(cSection.getIsVisible());
            }
            content.setContentSections(cSectionList);
        }

//        content.setContentSections(contentRequest.getContentSections());
        contentService.updateContent(content.getUuid(), content);
//        return ResponseEntity.ok(new MessageResponse("content has been updated"));
        return ResponseEntity.status(200).body(content);
    }
//    @GetMapping("/get")
//    @ResponseBody
//    public Product getProduct(@RequestParam String product) throws JsonMappingException, JsonProcessingException {
//        Product prod = objectMapper.readValue(product, Product.class);
//        return prod;
//    }

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
        logger.error("creationrequest: {}", creationRequest);

        Content content = new Content();
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long author_id  = null;
        if (principal instanceof UserDetailsImpl) {
            author_id  = ((UserDetailsImpl) principal).getId();
        }
        User author = null;
        Content parent = null;
//        String parent_uuid = creationRequest.getParent_uuid();
//        String uuid = creationRequest.getUuid();
        if(author_id == null){
            throw new RuntimeException("Error: Author_id required");
        }else{
            author = userRepository.getById(author_id);
        }
//        if(parent_uuid != null){
//            parent = contentRepository.getById(parent_uuid);
//        }
//        if(uuid != null){
//           content.setUuid(uuid);
//        }

        content.setPublished(false);
        content.setAuthorId(author.getId());
//        content.setParent(parent);
        Set< ContentSection > contentSections =  creationRequest.getContentSections();
//        ContentSection newContentSection = ContentSection();
        logger.error("content Sections: {}", contentSections);

        Content content2 = contentRepository.save(content);
        contentSections.forEach(section -> {
//            section.setContentUuid(content2);
            section.setContentUuid(content2.getUuid());
            section.setAssociatedContent(content2);
            logger.error("content Sections: {}", section);
            logger.error("content: {}", content2);
            contentSectionRepository.save(section);
        });
        Map<String,Object> map=new HashMap<>();
        map.put("main", content2);
        map.put("sections", contentSections);


        return ResponseEntity.status(200).body(map);
//        return (ResponseEntity<?>) ResponseEntity.status(500).body("this failed");

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
