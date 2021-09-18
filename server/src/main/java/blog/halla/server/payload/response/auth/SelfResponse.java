package blog.halla.server.payload.response.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class SelfResponse {
    private Long id;
    private String username;
    private String email;
    private List<String> roles;
    private List<String> permissions;

    public SelfResponse(Long id, String username, String email, List<String> roles, List<String> permissions) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
        this.permissions = permissions;
    }
}
