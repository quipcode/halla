package blog.halla.server.models.section_types;

import lombok.*;
import org.hibernate.envers.AuditTable;
import org.hibernate.envers.Audited;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Audited(withModifiedFlag = true)
@AuditTable("section_types_audit")
@Table(name = "section_types",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "id")
        }
)
public class SectionTypes {
    @Id
    private  Integer id;

    private String name;
}
