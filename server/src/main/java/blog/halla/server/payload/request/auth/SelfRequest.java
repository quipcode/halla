package blog.halla.server.payload.request.auth;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class SelfRequest {
    @NotBlank
    private String username;
}
