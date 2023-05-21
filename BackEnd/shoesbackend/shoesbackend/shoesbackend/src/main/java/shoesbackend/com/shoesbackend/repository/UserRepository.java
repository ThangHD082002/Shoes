package shoesbackend.com.shoesbackend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import shoesbackend.com.shoesbackend.model.User;


@Repository
public interface UserRepository extends JpaRepository<User, String>{

    User findByUsername(String username);
    
}
