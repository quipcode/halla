package blog.halla.server.models.quran.verses;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Tafsir {
    private TafsirContent[] tafsirs;
    private TafsirMeta meta;

    public Tafsir(){}
}

@Getter
@Setter
class TafsirContent{
    private Integer resource_id;
    private String text;

    public TafsirContent(){}
}


@Getter
@Setter
class TafsirMeta{
    private String tafsir_name;
    private String author_name;

    public TafsirMeta(){}
}