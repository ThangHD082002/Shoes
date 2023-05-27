package shoesbackend.com.shoesbackend.service.ServiceIpml;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import shoesbackend.com.shoesbackend.model.Color;
import shoesbackend.com.shoesbackend.model.OrderDetail;
import shoesbackend.com.shoesbackend.model.Orders;
import shoesbackend.com.shoesbackend.model.Product;
import shoesbackend.com.shoesbackend.model.Size;
import shoesbackend.com.shoesbackend.model.StatusOrderDetail;
import shoesbackend.com.shoesbackend.model.User;
import shoesbackend.com.shoesbackend.repository.ColorRepository;
import shoesbackend.com.shoesbackend.repository.OrderDetailRepository;
import shoesbackend.com.shoesbackend.repository.OrdersRepository;
import shoesbackend.com.shoesbackend.repository.ProductRepository;
import shoesbackend.com.shoesbackend.repository.SizeRepository;
import shoesbackend.com.shoesbackend.repository.UserRepository;
import shoesbackend.com.shoesbackend.request.CreateOrderAndOrderDetail;
import shoesbackend.com.shoesbackend.request.CreateOrderDetail;
import shoesbackend.com.shoesbackend.service.OrderDetailService;
import shoesbackend.com.shoesbackend.service.OrdersService;

@Service
public class OrderDetailServiceImpl implements OrderDetailService{

    @Autowired
    private OrderDetailRepository odRepository;

    @Autowired
    private UserRepository uRepository;

    @Autowired 
    private SizeRepository sRepository;

    @Autowired
    private ColorRepository cRepository;

    @Autowired
    private ProductRepository pRepository;

    @Autowired
    private OrdersRepository oRepository;


    @Override
    public void addOrderDetail(CreateOrderAndOrderDetail coaod, Orders ods) {
        User u = uRepository.findByUsername(coaod.getUsername());
        for(CreateOrderDetail cod : coaod.getOrderDetails()){
            Size s = sRepository.findByName(cod.getSize());
            Color c = cRepository.findByName(cod.getColor());
            Product p = pRepository.findById(cod.getId());
            OrderDetail od = OrderDetail.builder()
                                        .user(u)
                                        .size(s)
                                        .color(c)
                                        .name(coaod.getName())
                                        .address(coaod.getAddress())
                                        .phone(coaod.getPhone())
                                        .orders(ods)
                                        .product(p)
                                        .sod(StatusOrderDetail.Confirm)
                                        .price(cod.getTotal())
                                        .quantity_order(cod.getSl())
                                        .orders(ods)
                                        .build();
            odRepository.save(od);
        }
    }


    @Override
    public List<OrderDetail> getOrderDetails() {
        return odRepository.findAll();
    }


    @Override
    public List<OrderDetail> getOrderDetailsByUserName(String userName) {
        return odRepository.findByUserUsername(userName);
    }


    @Override
    public OrderDetail getOdeOrderDetailById(int id) {
        return odRepository.findById(id);
    }


    @Override
    public void UpdateStatusOrderDetail(StatusOrderDetail sod, int id) {
        Boolean check = true;
        OrderDetail od = odRepository.findById(id);
        if(sod == StatusOrderDetail.Canceled){
            od.setSod(StatusOrderDetail.Wait);
            check = false;
        }
        else{
            od.setSod(StatusOrderDetail.Canceled);
            check =true;
        }
        Orders o = oRepository.findById(od.getOrders().getId());
        if(check == true){
            o.setTotal_money((int)(o.getTotal_money() - od.getPrice()));
        }
        else{
            o.setTotal_money((int)(o.getTotal_money() + od.getPrice()));
        }
        
        oRepository.save(o);
        od.setOrders(o);
    }


    @Override
    public List<OrderDetail> getOrderDetailsByUserNameCustomer(String userName) {
        return odRepository.findByUserName(userName);
    }


    // @Override
    // public void UpdateStatusOrderDetail(StatusOrderDetail sod, int id) {
    //     // TODO Auto-generated method stub
    //     throw new UnsupportedOperationException("Unimplemented method 'UpdateStatusOrderDetail'");
    // }


    // @Override
    // public OrderDetail getOdeOrderDetailById(int id) {
    //     return odRepository.findById(id);
    // }
    
}
