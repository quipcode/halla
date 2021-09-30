package blog.halla.server.models.content_section;

import blog.halla.server.models.content.Content;
import blog.halla.server.models.section_types.SectionTypes;
import com.fasterxml.jackson.annotation.*;
import lombok.*;
import org.hibernate.envers.AuditTable;
import org.hibernate.envers.Audited;

import javax.persistence.*;
import java.util.UUID;

@Getter
@Setter
@Entity
@Audited(withModifiedFlag = true)
@AuditTable("content_section_audit")
@Table(name = "content_section",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "uuid")
        }
)
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "uuid",
        scope = ContentSection.class
)

public class ContentSection {
    @Id
//    private String uuid;
    private String uuid = UUID.randomUUID().toString().replaceAll("-", "");


//    @ManyToOne( fetch = FetchType.LAZY)
//    @JoinColumn(name = "section_type", nullable = false)
//    @JsonProperty("sectionType")
//    private SectionTypes sectionType;


//    @JoinTable(name = "c_section",
//            joinColumns = {@JoinColumn(name = "content_section_uuid", referencedColumnName = "uuid")},
//            inverseJoinColumns = {@JoinColumn(name = "content_uuid", referencedColumnName = "uuid")})
//    @JoinColumn(name="content_uuid", nullable = false, referencedColumnName = "uuid")
//    @ManyToOne
//    private Content content;


    @JoinColumn(name = "associatedContent", insertable = false, updatable = false)
    @ManyToOne(targetEntity = Content.class, fetch = FetchType.EAGER)
    @JsonIgnore
    private Content associatedContent;

    @Column(name = "contentUuid")
    private String contentUuid;

//    @Column(name = "content")
    private String content;

    private String title;
    private String summary;
    private Integer isTitleSelected;
    private Integer isSummarySelected;
//    private Integer isVisible;
    @Override
    public String toString(){
        return String.format("title: %s, summary: %s, uuid:%s, content:%s, contentUuid:%s", title, summary, uuid, content, contentUuid);

    }

}
