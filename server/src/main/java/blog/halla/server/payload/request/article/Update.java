package blog.halla.server.payload.request.article;

import blog.halla.server.models.article.Article;
import blog.halla.server.models.article_section.ArticleSection;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class Update {
    private Set<ArticleSection> sections;
    private Article article;

    @Override
    public String toString(){return String.format("article: %s, sectinos: %s", article, sections);}
}
