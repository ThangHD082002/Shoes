package shoesbackend.com.shoesbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import shoesbackend.com.shoesbackend.model.ProductGroup;

public interface ProductGroupRepository extends JpaRepository<ProductGroup, Integer> {
    ProductGroup findById(int id);
}
