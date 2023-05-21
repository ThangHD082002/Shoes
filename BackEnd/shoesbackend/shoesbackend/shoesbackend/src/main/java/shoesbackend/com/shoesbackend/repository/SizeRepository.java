package shoesbackend.com.shoesbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import shoesbackend.com.shoesbackend.model.Size;

public interface SizeRepository extends JpaRepository<Size, Integer> {
    Size findById(int id);
}
