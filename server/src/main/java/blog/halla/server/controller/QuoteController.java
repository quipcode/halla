package blog.halla.server.controller;

import blog.halla.server.models.quote.Quote;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/quote")
public class QuoteController {



    @GetMapping("random")
    public ResponseEntity<Quote> getRandomQuote() {
        String url = "https://quoters.apps.pcfone.io/api/random";
        RestTemplate restTemplate = new RestTemplate();
        Quote quote = restTemplate.getForObject(url, Quote.class);
        return new ResponseEntity<Quote>(quote, HttpStatus.OK);
    }
}
