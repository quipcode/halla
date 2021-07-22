package blog.halla.server.controller.quran;

import blog.halla.server.models.quote.Quote;
import blog.halla.server.models.quran.chapters.Chapter;
import blog.halla.server.models.quran.chapters.ChapterInfo;
import blog.halla.server.models.quran.chapters.Chapters;
import blog.halla.server.models.quran.verses.Translation;
import blog.halla.server.models.quran.verses.Uthmani;
import blog.halla.server.payload.response.MessageResponse;
import com.google.gson.Gson;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.websocket.server.PathParam;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/quran")
public class Controller {
    Gson gson = new Gson();

    @GetMapping("/chapters/list")
    public ResponseEntity<?> getChaptersList() throws IOException {
        String urlString = "https://api.quran.com/api/v4/chapters?language=en";
        URL url = new URL(urlString);
        InputStreamReader reader = new InputStreamReader(url.openStream());
        Chapters chapters = gson.fromJson(reader, Chapters.class);
        return  new ResponseEntity<Chapters>(chapters, HttpStatus.OK);
    }

    @GetMapping("/chapters/{id}")
    public ResponseEntity<?> getQuranChapter(@PathVariable("id") Integer chId) throws IOException {
        String urlString = "https://api.quran.com/api/v4/chapters/" + chId + "?language=en";
        URL url = new URL(urlString);
        InputStreamReader reader = new InputStreamReader(url.openStream());
        Chapter chapter = gson.fromJson(reader, Chapter.class);
        return new ResponseEntity<Chapter>(chapter, HttpStatus.OK);
    }

    @GetMapping("/chapters/info/{id}")
    public ResponseEntity<?> getQuranChapterInfo(@PathVariable("id") Integer chId) throws IOException {
        String urlString = "https://api.quran.com/api/v4/chapters/" + chId + "/info?language=en";
        URL url = new URL(urlString);
        InputStreamReader reader = new InputStreamReader(url.openStream());
        ChapterInfo chapterInfo = gson.fromJson(reader, ChapterInfo.class);
        return new ResponseEntity<ChapterInfo>(chapterInfo, HttpStatus.OK);
    }

    @GetMapping("/verse/{verse_key}")
    public ResponseEntity<?> getQuranVersesUthmani(@PathVariable("verse_key") String verseKey) throws IOException {
        String urlString = "https://api.quran.com/api/v4/quran/verses/uthmani?verse_key=" + verseKey;
        URL url = new URL(urlString);
//        return ResponseEntity.ok(new MessageResponse(urlString));
        InputStreamReader reader = new InputStreamReader(url.openStream());
        Uthmani verse = gson.fromJson(reader, Uthmani.class);
        return new ResponseEntity<Uthmani>(verse, HttpStatus.OK);
    }

    @GetMapping("/verse/translation/{verse_key}")
    public ResponseEntity<?> getQuranVerseTranslationYusufAli(@PathVariable("verse_key") String verseKey) throws IOException{
        String urlString = "https://api.quran.com/api/v4/quran/translations/22?verse_key=" + verseKey;
        URL url = new URL(urlString);
        InputStreamReader reader = new InputStreamReader((url.openStream()));
        Translation translation = gson.fromJson(reader, Translation.class);
        return new ResponseEntity<Translation>(translation, HttpStatus.OK);

    }
}
