package blog.halla.server.audit;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.envers.DefaultRevisionEntity;
import org.hibernate.envers.RevisionEntity;
import org.hibernate.envers.RevisionNumber;
import org.hibernate.envers.RevisionTimestamp;

import javax.persistence.*;
import java.text.DateFormat;
import java.util.Date;

@Entity
@Table(name = "revision_info")
@RevisionEntity(AuditRevisionListener.class)
@Getter
@Setter
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class AuditRevisionEntity{

    @Id
    @RevisionNumber
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int rev;

    @RevisionTimestamp
    private long rev_timestamp;

    @Column(name = "user")
    private String user;


    @Transient
    public Date getRevisionDate() {
        return new Date(this.rev_timestamp);
    }

    public boolean equals(Object o) {
        if (this == o) {
            return true;
        } else if (!(o instanceof AuditRevisionEntity)) {
            return false;
        } else {
            AuditRevisionEntity that = (AuditRevisionEntity)o;
            return this.rev == that.rev && this.rev_timestamp == that.rev_timestamp;
        }
    }



    public int hashCode() {
        int result = this.rev;
        result = 31 * result + (int)(this.rev_timestamp ^ this.rev_timestamp >>> 32);
        return result;
    }

    public String toString() {
        return "AuditRevisionEntity(id = " + this.rev + ", revisionDate = " + DateFormat.getDateTimeInstance().format(this.getRevisionDate()) + ")";
    }
}