package blog.halla.server.repository.content;

import blog.halla.server.models.User;
import blog.halla.server.models.content.Content;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ContentRepository extends JpaRepository<Content, String> {
    Page<Content> findByUuid(String uuid, Pageable pageable);
    Page<Content> findByAuthorId(User authorId, Pageable pageable);
}
