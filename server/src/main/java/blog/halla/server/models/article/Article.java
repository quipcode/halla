package blog.halla.server.models.article;

import com.fasterxml.jackson.annotation.*;
import lombok.*;
import org.hibernate.annotations.Type;
import org.hibernate.envers.AuditTable;
import org.hibernate.envers.Audited;
import javax.persistence.*;
import java.util.*;

import blog.halla.server.models.article_section.ArticleSection;
import org.hibernate.envers.NotAudited;

@Data
@NoArgsConstructor
@Entity
@Audited(withModifiedFlag = true)
@AuditTable("article_audit")
@Table(name = "article",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "id")
        }
)
public class Article {
    @Id
    private String id = UUID.randomUUID().toString().replaceAll("-", "");

    @Column(name = "author")
    private long authorId;
    private String title;
    @NotAudited
    private String summary;
    private String metaTitle;
    private String slug;


    @Column(nullable = false)
    @Type(type = "org.hibernate.type.NumericBooleanType")
    private boolean published;

    @Override
    public String toString(){
        return String.format("metatitle: %s, author: %s, uuid:%s, slug:%s, published:%s, summary:%s. title:%s", metaTitle, authorId, id, slug, published, summary, title);
    }

    @OneToMany(mappedBy = "article", fetch = FetchType.EAGER)
    @JsonIdentityReference
    @ElementCollection(targetClass = ArticleSection.class)
    public Set<ArticleSection> articleSections;

    public Article(String id, boolean published){
        this.id = id;
        this.published = published;
    }

    public Article(String metaTitle, String slug, boolean published, String title, String summary){
        this.metaTitle = metaTitle;
        this.slug = slug;
        this.published = published;
        this.title = title;
        this.summary = summary;
    }

}