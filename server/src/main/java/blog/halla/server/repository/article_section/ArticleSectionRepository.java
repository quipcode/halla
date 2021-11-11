package blog.halla.server.repository.article_section;

import blog.halla.server.models.article_section.ArticleSection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.Set;

public interface ArticleSectionRepository  extends JpaRepository<ArticleSection, String> {
    Set<ArticleSection> findByArticleId(@Param("article_id") String id);
}
