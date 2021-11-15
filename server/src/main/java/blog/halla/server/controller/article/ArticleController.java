package blog.halla.server.controller.article;

import blog.halla.server.models.User;
import blog.halla.server.models.article.Article;
import blog.halla.server.models.article_section.ArticleSection;
import blog.halla.server.payload.request.article.Update;
import blog.halla.server.repository.article.ArticleRepository;
import blog.halla.server.repository.article_section.ArticleSectionRepository;
import blog.halla.server.repository.security.UserRepository;
import blog.halla.server.services.UserDetailsImpl;
import blog.halla.server.services.article.ArticleService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/article")
public class ArticleController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    private ArticleService articleService;

    @Autowired
    ArticleRepository articleRepository;

    @Autowired
    ArticleSectionRepository articleSectionRepository;

    @GetMapping("/")
    public List<Article> getAllArticles(Pageable pageable){
        List<Article> articles = articleRepository.findAll();
        return articles;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getArticleById(@PathVariable("id") String id, Pageable pageable){
        Map<String, Object> article = articleService.getArticleById(id);
        return ResponseEntity.status(200).body(article.get("article") );
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateArticle(@Valid @RequestBody Update updateRequest, @PathVariable("id") String id) throws JsonMappingException, JsonProcessingException{
        Article incomingArticle = updateRequest.getArticle();
        Set<ArticleSection> incomingSections = updateRequest.getSections();
        User author = null;

        Optional<Article> articleStored = articleService.getArticle(id);
        Article article = articleStored.get();
        article.setMetaTitle(incomingArticle.getMetaTitle());
        article.setSlug(incomingArticle.getSlug());
        article.setSummary(incomingArticle.getSummary());
        article.setTitle(incomingArticle.getTitle());
        article.setPublished(incomingArticle.isPublished());
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long author_id = null;
        if(principal instanceof UserDetailsImpl){
            author_id = (((UserDetailsImpl) principal).getId());
        }
        if(author_id == null){
            throw new RuntimeException(("Error: Author_id required"));
        }else{
            author = userRepository.getById(author_id);
        }
        article.setAuthorId(author.getId());
//        Article updatedArticle = articleRepository.save(article);
        if(incomingSections != null){
            for(ArticleSection section : incomingSections){
                ArticleSection storedSection = articleSectionRepository.getById(section.getId());
                storedSection.setArticleId(article.getId());
                storedSection.setBody(section.getBody());
                storedSection.setTitle(section.getTitle());
                storedSection.setSummary(section.getSummary());
                storedSection.setIdx(section.getIdx());
                storedSection.setIsTitleSelected(section.getIsTitleSelected());
                storedSection.setIsSummarySelected(section.getIsSummarySelected());
                storedSection.setSectionTypeId(section.getSectionTypeId());
                articleSectionRepository.save(storedSection);
            }
        }
        Article updatedArticle = articleRepository.save(article);
        Map<String,Object> returningArticle =new HashMap<>();
        returningArticle.put("article", updatedArticle);
        return ResponseEntity.status(200).body(returningArticle);
    }

}
