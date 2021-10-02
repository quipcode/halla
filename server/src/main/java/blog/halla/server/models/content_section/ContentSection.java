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
    private String uuid = UUID.randomUUID().toString().replaceAll("-", "");

    @JoinColumn(name = "sectionType", insertable = false, updatable = false)
    @ManyToOne(targetEntity = SectionTypes.class, fetch = FetchType.EAGER)
    @JsonIgnore
    private SectionTypes sectionType;

    @Column(name = "sectionTypeId")
    private Integer sectionTypeId;

    @JoinColumn(name = "associatedContent", insertable = false, updatable = false)
    @ManyToOne(targetEntity = Content.class, fetch = FetchType.EAGER)
    @JsonIgnore
    private Content associatedContent;

    @Column(name = "contentUuid")
    private String contentUuid;

    @Column(name = "content")
    private String content;

    private String title;
    private String summary;
    private Integer isTitleSelected;
    private Integer isSummarySelected;
    private Integer idx;
    @Override
    public String toString(){
        return String.format("title: %s, summary: %s, uuid:%s, content:%s, sectionTypes: %s, idx: %s, contentUuid:%s", title, summary, uuid, content, sectionType, idx, contentUuid);

    }

}
