package shoesbackend.com.shoesbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import shoesbackend.com.shoesbackend.model.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    Product findById(int id);
    List<Product> findByBrand_Id(int id);
}
