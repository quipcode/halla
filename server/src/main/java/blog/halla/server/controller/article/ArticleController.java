package blog.halla.server.controller.article;

import blog.halla.server.models.article.Article;
import blog.halla.server.repository.article.ArticleRepository;
import blog.halla.server.repository.article_section.ArticleSectionRepository;
import blog.halla.server.repository.security.UserRepository;
import blog.halla.server.services.article.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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

    


}
