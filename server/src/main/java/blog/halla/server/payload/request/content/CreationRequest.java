package blog.halla.server.payload.request.content;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreationRequest {
    private String title;

    private String content;
}
