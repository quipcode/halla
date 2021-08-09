package blog.halla.server.repository.content;

import blog.halla.server.models.content.Content;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ContentRepository extends JpaRepository<Content, String> {
    Optional<Content> findByTitle(String title);
}
