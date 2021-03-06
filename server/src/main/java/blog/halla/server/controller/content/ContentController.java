package blog.halla.server.controller.content;

import blog.halla.server.models.User;
import blog.halla.server.models.content.Content;
import blog.halla.server.models.content_section.ContentSection;
import blog.halla.server.payload.request.content.ContentRequest;
import blog.halla.server.payload.request.content.CreationRequest;
import blog.halla.server.payload.request.content.EditRequest;
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

import javax.swing.text.html.Option;
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

    @GetMapping("/allmycontent")
    public Page<Content> getAllContentForCurrentUser(Pageable pageable){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long authorId  = null;
        if (principal instanceof UserDetailsImpl) {
            authorId  = ((UserDetailsImpl) principal).getId();
        }
        return contentService.getContentByUser(authorId, pageable);
    }


    @GetMapping("/user/{authorId}")
    public Page<Content> getAllUserContent(@PathVariable("authorId") Long authorId, Pageable pageable){
        return contentService.getContentByUser(authorId, pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getContentByUuid(@PathVariable("id") String id, Pageable pageable) {
        Map<String, Object> content = contentService.getContentById(id);
        Set<ContentSection> contentSections = contentSectionRepository.findByContentId(id);

        Map<String,Object> returningContent =new HashMap<>();
        returningContent.put("article", content);
        returningContent.put("sections", contentSections);
        return ResponseEntity.status(200).body(returningContent);
    }

    
    @DeleteMapping("/delete/{uuid}")
    public ResponseEntity<?> deleteContent(@PathVariable("uuid")String uuid){
        contentRepository.deleteById(uuid);
        return ResponseEntity.ok(new MessageResponse("content has been deleted"));
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
@PutMapping("/{uuid}")
public ResponseEntity<?> updateContent(@Valid @RequestBody EditRequest editRequest, @PathVariable("uuid") String uuid) throws JsonMappingException, JsonProcessingException {
    Content inComingArticle = editRequest.getArticle();
    Set< ContentSection > inComingSections =  editRequest.getSections();

    Optional<Content> contentStored = contentService.getContent(uuid);
    Content content = contentStored.get();
    content.setMetaTitle(inComingArticle.getMetaTitle());
    content.setSlug(inComingArticle.getSlug());
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    Long author_id  = null;
    if (principal instanceof UserDetailsImpl) {
        author_id  = ((UserDetailsImpl) principal).getId();
    }
//    String parent_uuid = "";
//    parent_uuid = editRequest.getArticle().getParent().getUuid();
//    if(parent_uuid != null){
//        Content parent_content = contentRepository.getById(parent_uuid);
//        content.setParent(parent_content);
//    }
    Set<ContentSection> sentSections = editRequest.getSections();
    List<ContentSection> sectionList = new ArrayList<ContentSection>();
    if(sentSections != null){
        for(ContentSection section : sentSections){
            ContentSection storedSection = contentSectionRepository.getById(section.getId());
            storedSection.setContentId(content.getId());
            storedSection.setContent(section.getContent());
            storedSection.setTitle(section.getTitle());
            storedSection.setSummary(section.getSummary());
            storedSection.setIdx(section.getIdx());
            storedSection.setIsTitleSelected(section.getIsTitleSelected());
            storedSection.setIsSummarySelected(section.getIsSummarySelected());
            storedSection.setSectionTypeId(section.getSectionTypeId());
        }
    }
    Map<String,Object> returningContent =new HashMap<>();
    returningContent.put("article", content);
    returningContent.put("sections", sentSections);
    return ResponseEntity.status(200).body(returningContent);
}

    @PostMapping("")
    public ResponseEntity<?> createNewContent(@Valid @RequestBody CreationRequest creationRequest){
        logger.error("creationrequest: {}", creationRequest);
        logger.error("content from creationrequest: {}", creationRequest.getArticle());
        logger.error("sections from creationrequest: {}", creationRequest.getSections());
        Content inComingArticle = creationRequest.getArticle();
        Set< ContentSection > inComingSections =  creationRequest.getSections();

        Content content = new Content();
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long author_id  = null;
        if (principal instanceof UserDetailsImpl) {
            author_id  = ((UserDetailsImpl) principal).getId();
        }
        User author = null;
        Content parent = null;
//
        if(author_id == null){
            throw new RuntimeException("Error: Author_id required");
        }else{
            author = userRepository.getById(author_id);
        }
////        String parent_uuid = creationRequest.getParent_uuid();
////        String uuid = creationRequest.getUuid();
////        if(parent_uuid != null){
////            parent = contentRepository.getById(parent_uuid);
////        }
////        if(uuid != null){
////           content.setUuid(uuid);
////        }
////        content.setParent(parent);
//
        content.setPublished(false);
        content.setAuthorId(author.getId());
        content.setSlug(inComingArticle.getSlug());
        content.setMetaTitle(inComingArticle.getMetaTitle());
        Content savedArticle = contentRepository.save(content);
        inComingSections.forEach(section -> {
                    section.setContentId(savedArticle.getId());
                    section.setAssociatedContent(savedArticle);
                    logger.error("content Sections: {}", section);
                    logger.error("content: {}", savedArticle);
                    contentSectionRepository.save(section);
        });
        Map<String,Object> returningContent =new HashMap<>();
        returningContent.put("article", savedArticle);
        returningContent.put("sections", inComingSections);
        return ResponseEntity.status(200).body(returningContent);
//
//        Set< ContentSection > contentSections =  creationRequest.getContentSections();
//        logger.error("content Sections: {}", contentSections);
//
//        Content content2 = contentRepository.save(content);
//        contentSections.forEach(section -> {
//            section.setContentUuid(content2.getUuid());
//            section.setAssociatedContent(content2);
//            logger.error("content Sections: {}", section);
//            logger.error("content: {}", content2);
//            contentSectionRepository.save(section);
//        });
//        Map<String,Object> map=new HashMap<>();
//        map.put("article", content2);
//        map.put("sections", contentSections);
//
//
//        return ResponseEntity.status(200).body(map);
//        return ResponseEntity.ok("Hello there");
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
