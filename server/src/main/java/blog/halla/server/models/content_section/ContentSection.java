package blog.halla.server.models.content_section;

import blog.halla.server.models.content.Content;
import blog.halla.server.models.section_types.SectionTypes;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
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
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "uuid")
public class ContentSection {
    @Id
    private String uuid;


//    @ManyToOne( fetch = FetchType.LAZY)
//    @JoinColumn(name = "section_type", nullable = false)
//    @JsonProperty("sectionType")
//    private SectionTypes sectionType;


//    @JoinTable(name = "c_section",
//            joinColumns = {@JoinColumn(name = "content_section_uuid", referencedColumnName = "uuid")},
//            inverseJoinColumns = {@JoinColumn(name = "content_uuid", referencedColumnName = "uuid")})
    @JoinColumn(name="content_uuid", nullable = false, referencedColumnName = "uuid")
    @ManyToOne
    private Content content_uuid;

    private String title;
    private String summary;
    private Integer isTitleSelected;
    private Integer isSummarySelected;
    private Integer isVisible;
    @Override
    public String toString(){
        return String.format("title: %s, summary: %s, uuid:%s", title, summary, uuid);

    }

}
