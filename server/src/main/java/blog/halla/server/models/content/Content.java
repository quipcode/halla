package blog.halla.server.models.content;


import blog.halla.server.models.User;
import com.fasterxml.jackson.annotation.*;
import lombok.*;
import org.hibernate.annotations.Type;
import org.hibernate.envers.AuditTable;
import org.hibernate.envers.Audited;
import org.hibernate.envers.NotAudited;

import javax.persistence.*;
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
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "uuid")
public class Content {



    @Id
    private String uuid = UUID.randomUUID().toString().replaceAll("-", "");

    @NotAudited
    @Singular
    @ManyToOne( fetch = FetchType.EAGER)
    @JoinColumn(name = "author_id", nullable = false)
    private User author_id;

    @OneToOne
    @JoinColumn(name = "parent_uuid")
    @JsonBackReference
    private Content parent;


    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    @JsonManagedReference
    private Set<Content> children;


    private String metaTitle;
    private String slug;
    private String summary;

    @Column(nullable = false)
    @Type(type = "org.hibernate.type.NumericBooleanType")
    private boolean published;

    private String title;

    private String content;

    public Content(String title, String content){
        this.title = title;
        this.content = content;
    }
}
