package blog.halla.server.controller.article;

import blog.halla.server.controller.content.ContentController;
import blog.halla.server.models.User;
import blog.halla.server.models.article.Article;
import blog.halla.server.models.article_section.ArticleSection;
import blog.halla.server.payload.request.article.ArticleRequest;
import blog.halla.server.repository.article.ArticleRepository;
import blog.halla.server.repository.article_section.ArticleSectionRepository;
import blog.halla.server.repository.security.UserRepository;
import blog.halla.server.services.UserDetailsImpl;
import blog.halla.server.services.article.ArticleService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/articles")
public class ArticleController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    private ArticleService articleService;

    @Autowired
    ArticleRepository articleRepository;

    @Autowired
    ArticleSectionRepository articleSectionRepository;

    Logger logger = LoggerFactory.getLogger(ContentController.class);


    @GetMapping("")
    public List<Article> getAllArticlesBland(Pageable pageable){
        logger.error("in the basic");
        List<Article> articles = articleRepository.findAll();
        return articles;
    }

    @GetMapping("/")
    public List<Article> getAllArticles(Pageable pageable){

        logger.error("in the slash");
        List<Article> articles = articleRepository.findAll();
        return articles;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getArticleById(@PathVariable("id") String id, Pageable pageable){
        Map<String, Object> article = articleService.getArticleById(id);
        return ResponseEntity.status(200).body(article.get("article") );
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateArticle(@Valid @RequestBody ArticleRequest updateRequest, @PathVariable("id") String id) throws JsonMappingException, JsonProcessingException{
        Article incomingArticle = updateRequest.getArticle();
        Set<ArticleSection> incomingSections = incomingArticle.getSections();
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
        if(incomingSections != null){
            for(ArticleSection section : incomingSections){
                if(articleSectionRepository.existsById(section.getId())){
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
                }else{
                    section.setArticleId(article.getId());
                    articleSectionRepository.save(section);
                }
            }
        }
        Article updatedArticle = articleRepository.save(article);
        Map<String,Object> returningArticle =new HashMap<>();
        returningArticle.put("article", updatedArticle);
        HttpHeaders responseHeaders = new HttpHeaders();
//        responseHeaders.set("Content-Range",
//                "posts 0-"+userRepository.findAll().size()+"/"+userRepository.findAll().size());
        responseHeaders.set("nick", "john");
        return ResponseEntity.ok().headers(responseHeaders).body(returningArticle);
//        return ResponseEntity.status(200).body(returningArticle);
    }

    @PostMapping("")
    public ResponseEntity<?> createNewArticle(@Valid @RequestBody ArticleRequest creationRequest){
        Article incomingArticle = creationRequest.getArticle();
        Set<ArticleSection> incomingSections = incomingArticle.getSections();
        Article article = new Article();
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long author_id = null;
        if(principal instanceof UserDetailsImpl){
            author_id = (((UserDetailsImpl) principal).getId());
        }
        User author = null;
        Article parent = null;
        if(author_id == null){
            throw  new RuntimeException("Error: Author_id required");
        }else{
            author = userRepository.getById(author_id);
        }
        article.setPublished(false);
        article.setAuthorId(author.getId());
        article.setSlug(incomingArticle.getSlug());
        article.setMetaTitle(incomingArticle.getMetaTitle());
        article.setTitle(incomingArticle.getTitle());
        article.setSummary(incomingArticle.getSummary());
        Article savedArticle = articleRepository.save(article);

        if(incomingSections != null){
            incomingSections.forEach( section -> {
                section.setArticleId(savedArticle.getId());
                articleSectionRepository.save(section);
            });
        }

        Map<String, Object> newlyCreatedArticle = articleService.getArticleById(savedArticle.getId());
        return ResponseEntity.status(200).body(newlyCreatedArticle.get("article"));
    }

}
