package shoesbackend.com.shoesbackend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import shoesbackend.com.shoesbackend.model.User;


@Repository
public interface UserRepository extends JpaRepository<User, String>{

    User findByUsername(String username);

    @Query("SELECT u FROM User u JOIN u.roles r WHERE u.username = :username AND r.name = :roleName")
    Optional<User> findByUsernameAndRoleOne(@Param("username") String username, @Param("roleName") String roleName);

    @Query("SELECT u FROM User u JOIN u.roles r WHERE u.username LIKE %:username% AND r.name = :roleName")
    List<User> findByUsernameAndRole(@Param("username") String username, @Param("roleName") String roleName);
    
}
