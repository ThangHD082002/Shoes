package shoesbackend.com.shoesbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import shoesbackend.com.shoesbackend.model.OrderDetail;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {

    // @Query("SELECT o FROM OrderDetail o WHERE LOWER(o.user.username) LIKE LOWER(CONCAT('%', :username, '%'))")
    // List<OrderDetail> findByUserUsername(@Param("username") String username);

    // @Query("SELECT od FROM OrderDetail od WHERE od.user.name = :userName")
    // List<OrderDetail> findByUserName(@Param("username") String username);

    @Query("SELECT od FROM OrderDetail od WHERE od.user.username = :username")
    List<OrderDetail> findByUserName(@Param("username") String username);

    @Query("SELECT o FROM OrderDetail o WHERE LOWER(o.user.username) LIKE LOWER(CONCAT('%', :username, '%'))")
    List<OrderDetail> findByUserUsername(@Param("username") String username);
    OrderDetail findById(int id);

    
}
