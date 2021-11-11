package blog.halla.server.repository.article;

import blog.halla.server.models.article.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArticleRepository extends JpaRepository<Article, String> {
    Page<Article> findById(String id, Pageable pageable);
    Page<Article> findByAuthorId(Long authorId, Pageable pageable);
    List<Article> findByAuthorId(Long authorId);
    List<Article> findAll();
}
