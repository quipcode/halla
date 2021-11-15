package blog.halla.server.payload.request.article;

import blog.halla.server.models.article.Article;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ArticleRequest {
    private Article article;

    @Override
    public String toString(){return String.format("article: %s", article);}
}
