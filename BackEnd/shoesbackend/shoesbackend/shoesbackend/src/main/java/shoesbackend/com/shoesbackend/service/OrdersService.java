package shoesbackend.com.shoesbackend.service;

import java.util.List;

import shoesbackend.com.shoesbackend.model.Orders;
import shoesbackend.com.shoesbackend.request.CreateOrderAndOrderDetail;

public interface OrdersService {
    List<Orders> getOrders();
    void addOrders(CreateOrderAndOrderDetail coaod);
    List<Orders> getListOrdersByUsername(String username);
    Orders getOrderBYId(int id);
    void saveOrder(Orders order);

    
}
