package blog.halla.server.models.content;


import blog.halla.server.models.User;
import com.fasterxml.jackson.annotation.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.envers.AuditTable;
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
@AuditTable("content_audit")
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
//    @ManyToOne(cascade= CascadeType.MERGE, fetch = FetchType.EAGER)
    @ManyToOne( fetch = FetchType.EAGER)
//    @JoinTable(name="user_content",
//            joinColumns={@JoinColumn(name="content_uuid", referencedColumnName="uuid")},
//            inverseJoinColumns={@JoinColumn(name="user_id", referencedColumnName="id")})
    @JoinColumn(name = "author_id", nullable = false)
    private User author_id;

//    @NotAudited
//    @ManyToOne(fetch = FetchType.LAZY, optional = false)
//    @JoinColumn(name = "author_id", nullable = false)
//    @OnDelete(action = OnDeleteAction.CASCADE)
//    @JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="id")
//    @JsonIdentityReference(alwaysAsId=true)
//    @JsonProperty("author_id")
//    private User author_id;


    @OneToOne
    @JoinColumn(name = "parent_uuid")
    @JsonBackReference
    private Content parent;


    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    @JsonManagedReference
    private Set<Content> children;


    private String title;

    private String content;

    public Content(String title, String content){
        this.title = title;
        this.content = content;
    }
}
