package shoesbackend.com.shoesbackend.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import shoesbackend.com.shoesbackend.model.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    Product findById(int id);
    List<Product> findByBrand_Id(int id);

    
    @Query("SELECT p FROM Product p ORDER BY p.id ASC")
    List<Product> findProductsFromIndex(@Param("index") int index, Pageable pageable);

    
    @Query("SELECT p FROM Product p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Product> findByName(@Param("name") String name);
}
