package blog.halla.server.repository.content;

import blog.halla.server.models.content.Content;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.stream.Stream;

public interface ContentRepository extends JpaRepository<Content, String> {
    Page<Content> findById(String id, Pageable pageable);
    Page<Content> findByAuthorId(Long authorId, Pageable pageable);
    List<Content> findByAuthorId(Long authorId);
    List<Content> findAll();
//    Stream<Content> findAll();
//    Page<Content> findAll(Pageable pageable);
}
