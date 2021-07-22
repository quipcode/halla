package blog.halla.server.models.quran.verses;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Translation {
    private TranslationText[] translations;
    private TranslationMeta meta;

    public Translation(){}
}

@Getter
@Setter
class TranslationText{
    private Integer resource_id;
    private String text;

    public TranslationText(){}
}

@Getter
@Setter
class TranslationMeta{
    private String translation_name;
    private String author_name;

    public TranslationMeta(){}
}