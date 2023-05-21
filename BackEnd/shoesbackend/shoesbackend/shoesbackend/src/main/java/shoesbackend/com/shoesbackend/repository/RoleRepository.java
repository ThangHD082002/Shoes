package shoesbackend.com.shoesbackend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import shoesbackend.com.shoesbackend.model.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(String rollName);
    void deleteByName(String rollName);
    Role findById(int id);
}
