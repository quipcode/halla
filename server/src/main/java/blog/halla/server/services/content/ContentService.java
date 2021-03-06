package blog.halla.server.services.content;

import blog.halla.server.models.content.Content;
import blog.halla.server.models.content_section.ContentSection;
import blog.halla.server.repository.content.ContentRepository;
import blog.halla.server.repository.content_section.ContentSectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ContentService {

    @Autowired
    private ContentRepository contentRepository;

    @Autowired
    private ContentSectionRepository contentSectionRepository;

    public List<Content> getAllContents() {
        return (List<Content>) this.contentRepository.findAll();
    }

    public Optional<Content> getContent(String id) {
        Optional<Content> targetContent = contentRepository.findById(id);
//        Set<Content> children = targetContent.get().getChildren();
//        Optional<ContentSection> associatedContentSections = contentSectionRepository.findByContentUuid(id);

        return targetContent;
    }

    public Page<Content> getContentByUser(Long authorId, Pageable pageable){
        Page<Content> contents = contentRepository.findByAuthorId(authorId, pageable);
        for(Content content : contents){
            Set<ContentSection> associatedSection = contentSectionRepository.findByContentId(content.getId());
            content.setContentSections(associatedSection);
        }
        return  contents;
    }
    public Map<String, Object> getContentById(String id){
        Optional<Content> targetContent = contentRepository.findById(id);
        Map<String, Object> answer = new HashMap<>();
        answer.put("content", targetContent);
        return answer;
    }

    public void createContent(Content Content) {
        this.contentRepository.save(Content);
    }

//    public void updateContent(String id, Content content) {
//        List<ContentSection> contentSections = content.getContentSections();
////        for()
////        this.contentSectionRepository.save();
//        this.contentRepository.save(content);
//    }

    public void deleteContent(String id) {
        this.contentRepository.deleteById(id);
    }

}
