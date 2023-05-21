package shoesbackend.com.shoesbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import shoesbackend.com.shoesbackend.model.ProductSize;

public interface ProductSizeRepository extends JpaRepository<ProductSize, Integer> {
    List<ProductSize> findAll();
    List<ProductSize> findByProduct_id(int id);
}
