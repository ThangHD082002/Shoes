package shoesbackend.com.shoesbackend.service.ServiceIpml;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import shoesbackend.com.shoesbackend.model.Orders;
import shoesbackend.com.shoesbackend.model.User;
import shoesbackend.com.shoesbackend.repository.OrdersRepository;
import shoesbackend.com.shoesbackend.repository.UserRepository;
import shoesbackend.com.shoesbackend.request.CreateOrderAndOrderDetail;
import shoesbackend.com.shoesbackend.service.OrderDetailService;
import shoesbackend.com.shoesbackend.service.OrdersService;


@Service
public class OrdersServiceImpl implements OrdersService {

    @Autowired
    private OrdersRepository oRepository;

    @Autowired
    private UserRepository uRepository;

    @Autowired
    private OrderDetailService odService;

    @Override
    public List<Orders> getOrders() {
        return oRepository.findAll();
    }

    

    @Override
    public void addOrders(CreateOrderAndOrderDetail coaod) {
        User u = uRepository.findByUsername(coaod.getUsername());
        int totalall = Integer.parseInt(coaod.getTotalAll());
        Orders order = Orders.builder()
                            .user(u)
                            .total_money(totalall)
                            .build();
        oRepository.save(order);
        odService.addOrderDetail(coaod, order);
    }

    @Override
    public List<Orders> getListOrdersByUsername(String username) {
        return oRepository.findByUserUsername(username);
    }

    @Override
    public Orders getOrderBYId(int id) {
        return oRepository.findById(id);
    }



    @Override
    public void saveOrder(Orders order) {
        oRepository.save(order);
    }
    
}
