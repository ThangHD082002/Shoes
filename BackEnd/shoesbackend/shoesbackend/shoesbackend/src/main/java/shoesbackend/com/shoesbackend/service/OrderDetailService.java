package shoesbackend.com.shoesbackend.service;

import java.util.List;

import shoesbackend.com.shoesbackend.model.OrderDetail;
import shoesbackend.com.shoesbackend.model.Orders;
import shoesbackend.com.shoesbackend.model.StatusOrderDetail;
import shoesbackend.com.shoesbackend.request.CreateOrderAndOrderDetail;

public interface OrderDetailService {
    void addOrderDetail(CreateOrderAndOrderDetail coaod, Orders ods);
    List<OrderDetail> getOrderDetails();
    List<OrderDetail> getOrderDetailsByUserName(String userName);
    void UpdateStatusOrderDetail(StatusOrderDetail sod, int id);
    OrderDetail getOdeOrderDetailById(int id);
    List<OrderDetail> getOrderDetailsByUserNameCustomer(String userName);
}
