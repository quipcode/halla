package blog.halla.server.models.content;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "content",
        uniqueConstraints = {
            @UniqueConstraint(columnNames = "uuid")
        }
)
public class Content {



    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String uuid = UUID.randomUUID().toString().replaceAll("-", "");

    private String title;

    private String content;

    public Content(String title, String content){
        this.title = title;
        this.content = content;
    }
}
