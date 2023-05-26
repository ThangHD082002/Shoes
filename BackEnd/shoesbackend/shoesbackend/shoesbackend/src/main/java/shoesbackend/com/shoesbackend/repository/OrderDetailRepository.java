package shoesbackend.com.shoesbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import shoesbackend.com.shoesbackend.model.OrderDetail;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {
    @Query("SELECT o FROM OrderDetail o WHERE LOWER(o.user.username) LIKE LOWER(CONCAT('%', :username, '%'))")
    List<OrderDetail> findByUserUsername(@Param("username") String username);
    OrderDetail findById(int id);
}
