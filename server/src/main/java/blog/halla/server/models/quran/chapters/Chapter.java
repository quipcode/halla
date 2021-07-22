package blog.halla.server.models.quran.chapters;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Chapter {
    private ChapterDetail chapter;

    public Chapter(){}
}

@Getter
@Setter
class ChapterDetail{
    private Integer id;
    private String revelation_place;
    private String revelation_order;
    private String bismillah_pre;
    private String name_simple;
    private String name_complex;
    private String name_arabic;
    private Integer verses_count;
    private Integer[] pages;
    private TranslatedNames translated_name;
    public ChapterDetail(){}
}

@Getter
@Setter
class TranslatedNames {
    private String language_name;
    private String name;

    public TranslatedNames(){}
}
