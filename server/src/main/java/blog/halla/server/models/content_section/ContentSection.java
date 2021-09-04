package blog.halla.server.models.content_section;

import blog.halla.server.models.content.Content;
import blog.halla.server.models.section_types.SectionTypes;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import org.hibernate.envers.AuditTable;
import org.hibernate.envers.Audited;

import javax.persistence.*;

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
public class ContentSection {
    @Id
    private String uuid;


    @ManyToOne( fetch = FetchType.LAZY)
    @JoinColumn(name = "id", nullable = false)
    private SectionTypes sectionType;

    @ManyToOne
    private Content content_uuid;

    private String title;
    private String summary;
    private Integer isTitleSelected;
    private Integer isSummarySelected;
    private Integer isVisible;

}
