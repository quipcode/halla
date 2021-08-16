package blog.halla.server.audit;
import blog.halla.server.models.User;
import blog.halla.server.services.UserDetailsImpl;
import org.hibernate.envers.RevisionListener;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;


import java.util.Optional;

public class AuditRevisionListener implements RevisionListener {

    @Override
    public void newRevision(Object revisionEntity) {

        String currentUser = Optional.ofNullable(SecurityContextHolder.getContext())
                .map(SecurityContext::getAuthentication)
                .filter(Authentication::isAuthenticated)
                .map(Authentication::getPrincipal)
                .map(UserDetailsImpl.class::cast)
                .map(UserDetailsImpl::getUsername)
                .orElse("Unknown-User");

        AuditRevisionEntity audit = (AuditRevisionEntity) revisionEntity;
        audit.setUser(currentUser);

    }
}