package shoesbackend.com.shoesbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import shoesbackend.com.shoesbackend.model.Orders;

public interface OrdersRepository extends JpaRepository<Orders, Integer> {
    
}
