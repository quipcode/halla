package blog.halla.server.models.content;


import blog.halla.server.models.User;
import lombok.*;
import org.hibernate.envers.Audited;
import org.hibernate.envers.NotAudited;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Audited(withModifiedFlag = true)
@Table(name = "content",
        uniqueConstraints = {
            @UniqueConstraint(columnNames = "uuid")
        }
)
public class Content {



    @Id
    private String uuid = UUID.randomUUID().toString().replaceAll("-", "");

    @NotAudited
    @Singular
    @ManyToOne(cascade= CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinTable(name="user_content",
            joinColumns={@JoinColumn(name="content_uuid", referencedColumnName="uuid")},
            inverseJoinColumns={@JoinColumn(name="user_id", referencedColumnName="id")})
    private User author_id;

    @OneToOne
    @JoinColumn(name = "parent_uuid")
    private Content parent;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    private Set<Content> children = new HashSet<>();


    private String title;

    private String content;

    public Content(String title, String content){
        this.title = title;
        this.content = content;
    }
}
