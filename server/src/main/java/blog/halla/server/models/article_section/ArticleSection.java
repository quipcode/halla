package blog.halla.server.models.article_section;

import blog.halla.server.models.article.Article;
import blog.halla.server.models.section_types.SectionTypes;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.envers.AuditTable;
import org.hibernate.envers.Audited;

import javax.persistence.*;
import java.util.UUID;

@Getter
@Setter
@Entity
@Audited(withModifiedFlag = true)
@AuditTable("article_section_audit")
@Table(name = "article_section",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "id")
        }
)
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id",
        scope = blog.halla.server.models.article_section.ArticleSection.class
)
public class ArticleSection {
    @Id
    private String id = UUID.randomUUID().toString().replaceAll("-", "");

    @JoinColumn(name = "sectionType", insertable = false, updatable = false)
    @ManyToOne(targetEntity = SectionTypes.class, fetch = FetchType.EAGER)
    @JsonIgnore
    private SectionTypes sectionType;

    @Column(name = "sectionTypeId")
    private Integer sectionTypeId;

    @JoinColumn(name = "associatedArticle", insertable = false, updatable = false)
    @ManyToOne(targetEntity = Article.class, fetch = FetchType.EAGER)
    @JsonIgnore
    private Article associatedArticle;

    @Column(name = "articleId")
    private String articleId;

    @Column(name = "article")
    private String article;

    private String title;
    private String summary;
    private Integer isTitleSelected;
    private Integer isSummarySelected;
    private Integer idx;
    @Override
    public String toString(){
        return String.format("title: %s, summary: %s, Id:%s, article:%s, sectionTypes: %s, idx: %s, articleId:%s", title, summary, id, article, sectionType, idx, articleId);

    }
}