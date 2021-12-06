package blog.halla.server.controller.articlesections;

import blog.halla.server.controller.content.ContentController;
import blog.halla.server.models.article.Article;
import blog.halla.server.models.article_section.ArticleSection;
import blog.halla.server.repository.article_section.ArticleSectionRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/articlesections")
public class ArticleSectionsController {
    @Autowired
    ArticleSectionRepository articleSectionRepository;

    Logger logger = LoggerFactory.getLogger(ContentController.class);

    @GetMapping("")
    public Collection<ArticleSection> getArticleSectionsByArticleId(@RequestParam("sort") String sortParam, @RequestParam("range") String rangeParam, @RequestParam("filter") String filters, Pageable pageable) throws JsonProcessingException {
        logger.error("in the get call");
        ObjectMapper mapper = new ObjectMapper();
        Map<String,Object> jsonOfFilters = mapper.readValue(filters, Map.class);
//        List <String>  idsToFilerFor = (List<String>) jsonOfFilters.get("ids");
//        String idAtIdxZero = idsToFilerFor.get(0);
//        return articleSectionRepository.findByArticleId(idAtIdxZero);
        String articleID = (String) jsonOfFilters.get("article_id");
        logger.error(articleID);
        return articleSectionRepository.findByArticleId(articleID);
//        can't run for loop on the entire list of 'ids' as jackson utilizes linkedhashset see https://www.baeldung.com/jackson-linkedhashmap-cannot-be-cast'
//        Collection <ArticleSection> collectionOfArticleSections = new ArrayList();
//        idsToFilerFor.forEach(id -> collectionOfArticleSections.add((ArticleSection) articleSectionRepository.findByArticleId(id.toString())));
//        return collectionOfArticleSections;
    }
    @GetMapping("/")
    public List<ArticleSection> getAllArticleSections(Pageable pageable){
        List<ArticleSection> articleSections = articleSectionRepository.findAll();
        return articleSections;
    }
}
