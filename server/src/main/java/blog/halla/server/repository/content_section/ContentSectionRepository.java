package blog.halla.server.repository.content_section;

import blog.halla.server.models.content.Content;
import blog.halla.server.models.content_section.ContentSection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface ContentSectionRepository extends JpaRepository<ContentSection, String> {
    Set<ContentSection> findByContentId(@Param("content_id") String id);
}
