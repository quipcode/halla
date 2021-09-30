package blog.halla.server.payload.request.content;

import blog.halla.server.models.content_section.ContentSection;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class CreationRequest {
//    private String uuid;

    private Set<ContentSection> contentSections;

//    private Long author_id;

//    private String parent_uuid;
}
