package blog.halla.server.models.content;


import blog.halla.server.models.User;
import blog.halla.server.models.content_section.ContentSection;
import com.fasterxml.jackson.annotation.*;
import lombok.*;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.Type;
import org.hibernate.envers.AuditTable;
import org.hibernate.envers.Audited;
import org.hibernate.envers.NotAudited;

import javax.persistence.*;
import java.util.*;

@Data
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
//    private String uuid;
    private String uuid = UUID.randomUUID().toString().replaceAll("-", "");

    @Column(name = "author")
    private long authorId;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "parent_uuid")
    @JsonBackReference
    private Content parent;

    @OneToMany(mappedBy = "parent",  cascade = CascadeType.ALL, fetch = FetchType.EAGER )
//    @JsonManagedReference(value = "")
//    @JsonProperty("children")
//    @OneToMany(mappedBy = "parent", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Set<Content> children;

//    @JsonView( value = {DTOViews, DTOViews.Owner.class} )
//    @JsonManagedReference( value = "User-ProfessionalExperience" )
//    @OneToMany( mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY )
//    private Set<ProfessionalExperience> professionalExperiences;

//    public Set<Content> getChildren(){
//        return this.children;
//    }

    @OneToMany(mappedBy = "content", fetch = FetchType.EAGER)
    @JsonIdentityReference
    @ElementCollection(targetClass=ContentSection.class)
//    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
//    @JsonIgnoreProperties({"hibernateEagerInitializer", "handler"})
    public List<ContentSection> contentSections;






    private String metaTitle;
    private String slug;


    @Column(nullable = false)
    @Type(type = "org.hibernate.type.NumericBooleanType")
    private boolean published;

//    @Singular
//    @OneToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST}, fetch = FetchType.EAGER)
//    @JoinColumn(name = "content_section_uuid", referencedColumnName = "uuid")
//    @NotAudited
//    @JoinTable(name = "c_section",
//            joinColumns = {@JoinColumn(name = "content_uuid", referencedColumnName = "uuid")},
//            inverseJoinColumns = {@JoinColumn(name = "content_section_uuid", referencedColumnName = "uuid")})
//    private Set<ContentSection> contentSections;

    @Override
    public String toString(){
        return String.format("metatitle: %s, author: %s, uuid:%s, children: %s, slug:%s, published:%s", metaTitle, authorId, uuid, children, slug, published);
//        return String.format(" uuid:%s", uuid);
//        return String.format("parent: %s", parent);

    }

    public Content(String uuid, Content parent, boolean published){
        this.uuid = uuid;
        this.parent = parent;
        this.published = published;
    }

    public Content(String metaTitle, String slug, boolean published){
        this.metaTitle = metaTitle;
        this.slug = slug;
        this.published = published;
    }
}
