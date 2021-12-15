package blog.halla.server.controller.article;


import blog.halla.server.models.article.Article;
import blog.halla.server.repository.article.ArticleRepository;
import blog.halla.server.services.article.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/gatsby/articles")
public class GatsbyArticleController {

    @Autowired
    private ArticleService articleService;

    @Autowired
    ArticleRepository articleRepository;

    @GetMapping("")
    public List<Article> getAllActiveAndPublishedArticles(Pageable pageable){
        List<Article> articles = articleRepository.findAllByActiveAndPublished(true,true);
        return articles;
    }

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
}
