package blog.halla.server.repository.content_section;

import blog.halla.server.models.content_section.ContentSection;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContentSectionRepository extends JpaRepository<ContentSection, String> {
}
