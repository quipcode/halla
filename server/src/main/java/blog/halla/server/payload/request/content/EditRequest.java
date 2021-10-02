package blog.halla.server.payload.request.content;

import blog.halla.server.models.content.Content;
import blog.halla.server.models.content_section.ContentSection;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class EditRequest {
    private Set<ContentSection> sections;

    private Content article;
    @Override
    public String toString(){
        return String.format("content: %s, sections: %s", article, sections);
    }
}
