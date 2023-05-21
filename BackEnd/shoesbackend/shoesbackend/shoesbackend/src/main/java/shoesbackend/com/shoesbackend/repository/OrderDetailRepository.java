package shoesbackend.com.shoesbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import shoesbackend.com.shoesbackend.model.OrderDetail;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {
    
}
