package blog.halla.server.services.content;

import blog.halla.server.models.content.Content;
import blog.halla.server.repository.content.ContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContentService {

    @Autowired
    private ContentRepository contentRepository;

    public List<Content> getAllContents() {
        return (List<Content>) this.contentRepository.findAll();
    }

    public Optional<Content> getContent(String id) {
        Optional<Content> targetContent = contentRepository.findById(id);
        return targetContent;
    }

    public void createContent(Content Content) {
        this.contentRepository.save(Content);
    }

    public void updateContent(String id, Content Content) {
        this.contentRepository.save(Content);
    }

    public void deleteContent(String id) {
        this.contentRepository.deleteById(id);
    }

}
