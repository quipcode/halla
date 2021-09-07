package blog.halla.server.models.content;


import blog.halla.server.models.User;
import blog.halla.server.models.content_section.ContentSection;
import com.fasterxml.jackson.annotation.*;
import lombok.*;
import org.hibernate.annotations.Type;
import org.hibernate.envers.AuditTable;
import org.hibernate.envers.Audited;
import org.hibernate.envers.NotAudited;

import javax.persistence.*;
import java.util.List;
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
    private String uuid;
//    private String uuid = UUID.randomUUID().toString().replaceAll("-", "");

//    @NotAudited
//    @Singular
//    @ManyToOne( fetch = FetchType.LAZY)
//    @ManyToOne
//    @JoinColumn(name = "author_id", nullable = false)
//    private User author;
//    @NotAudited
//    @Singular
//    @JoinColumn(name = "author", insertable = false, updatable = false)
//    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
//    private User author;

    @Column(name = "author")
    private long authorId;


    @OneToOne
    @JoinColumn(name = "parent_uuid")
    @JsonBackReference
    private Content parent;

    @OneToMany(mappedBy = "content")
    public List<ContentSection> contentSections;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    @JsonManagedReference
    private Set<Content> children;


    private String metaTitle;
    private String slug;


    @Column(nullable = false)
    @Type(type = "org.hibernate.type.NumericBooleanType")
    private boolean published;


//
//    @Singular
//    @OneToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST}, fetch = FetchType.EAGER)
//    @JoinColumn(name = "content_section_uuid", referencedColumnName = "uuid")
//    @NotAudited
//    @JoinTable(name = "c_section",
//            joinColumns = {@JoinColumn(name = "content_uuid", referencedColumnName = "uuid")},
//            inverseJoinColumns = {@JoinColumn(name = "content_section_uuid", referencedColumnName = "uuid")})
//    private Set<ContentSection> contentSections;



    public Content(String uuid, Content parent, boolean published){
        this.uuid = uuid;
        this.parent = parent;
        this.published = published;
    }
}
