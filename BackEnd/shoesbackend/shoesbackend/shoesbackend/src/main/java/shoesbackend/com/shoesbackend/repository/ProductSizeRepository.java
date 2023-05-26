package shoesbackend.com.shoesbackend.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import shoesbackend.com.shoesbackend.model.ProductSize;

public interface ProductSizeRepository extends JpaRepository<ProductSize, Integer> {
    List<ProductSize> findAll();
    List<ProductSize> findByProduct_id(int id);

    @Query("SELECT ps FROM ProductSize ps ORDER BY ps.id ASC")
    List<ProductSize> findProductSizesFromIndex(@Param("index") int index, Pageable pageable);

    @Query("SELECT ps FROM ProductSize ps WHERE LOWER(ps.product.name) LIKE LOWER(CONCAT('%', :productName, '%'))")
    List<ProductSize> findByProductName(@Param("productName") String productName);
}
