package blog.halla.server.models.quran.verses;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Uthmani {
    private UthmaniDetail[] verses;
    public Uthmani(){}
}

@Getter
@Setter
class UthmaniDetail{
    private Integer id;
    private String verse_key;
    private String text_uthmani;

}
