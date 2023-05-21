package shoesbackend.com.shoesbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import shoesbackend.com.shoesbackend.model.Brand;

public interface BrandRepository extends JpaRepository<Brand, Integer>{
    Brand findById(int id);
}
