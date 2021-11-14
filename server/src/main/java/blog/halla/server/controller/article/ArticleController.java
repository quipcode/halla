package blog.halla.server.controller.article;

import blog.halla.server.models.article.Article;
import blog.halla.server.models.article_section.ArticleSection;
import blog.halla.server.repository.article.ArticleRepository;
import blog.halla.server.repository.article_section.ArticleSectionRepository;
import blog.halla.server.repository.security.UserRepository;
import blog.halla.server.services.article.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

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


}
