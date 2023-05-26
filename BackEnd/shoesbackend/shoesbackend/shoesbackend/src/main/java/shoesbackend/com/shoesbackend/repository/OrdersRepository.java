package shoesbackend.com.shoesbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import shoesbackend.com.shoesbackend.model.Orders;

public interface OrdersRepository extends JpaRepository<Orders, Integer> {
    @Query("SELECT o FROM Orders o WHERE LOWER(o.user.username) LIKE LOWER(CONCAT('%', :username, '%'))")
    List<Orders> findByUserUsername(@Param("username") String username); 
    Orders findById(int id);  
}
