package blog.halla.server.models.quran.chapters;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChapterInfo {
    private ChapterInfoDetails chapter_info;
    public ChapterInfo(){}
}

@Getter
@Setter
class ChapterInfoDetails{
    private Integer id;
    private String chapter_id;
    private String language_name;
    private String short_text;
    private String source;
    private String text;

    public ChapterInfoDetails(){}
}