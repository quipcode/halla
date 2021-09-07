package blog.halla.server.payload.request.content;
import blog.halla.server.models.content_section.ContentSection;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ContentRequest {
    private String title;

    private String content;

    private String parent_uuid;

    @JsonProperty("contentSections")
    @JsonIdentityReference
    private List<ContentSection> contentSections;

}
