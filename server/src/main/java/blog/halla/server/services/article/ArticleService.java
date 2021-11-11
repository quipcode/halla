package blog.halla.server.services.article;

import blog.halla.server.models.article.Article;
import blog.halla.server.models.article_section.ArticleSection;
import blog.halla.server.repository.article.ArticleRepository;
import blog.halla.server.repository.article_section.ArticleSectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ArticleService {
    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private ArticleSectionRepository articleSectionRepository;

    public List<Article> getAllArticles() {return (List<Article>) this.articleRepository.findAll();}

    public Optional<Article> getArticle(String id){
        Optional<Article> article = articleRepository.findById(id);
        return article;
    }

    public Page<Article> getArticleByUser(Long authorId, Pageable pageable){
        Page<Article> articles = articleRepository.findByAuthorId(authorId, pageable);
        for(Article article : articles){
            Set<ArticleSection> associatedSections = articleSectionRepository.findByArticleId(article.getId());
            article.setArticleSections(associatedSections);
        }
        return articles;
    }

    public Map<String, Object> getArticleById(String id){
        Optional<Article> article = articleRepository.findById(id);
        Map<String, Object> response = new HashMap<>();
        response.put("article", article);
        return response;
    }

    public void createArticle(Article Article) {
        this.articleRepository.save(Article);
    }

    public void deleteArticle(String id) {
        this.articleRepository.deleteById(id);
    }
}
