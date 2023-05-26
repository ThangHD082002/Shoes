package shoesbackend.com.shoesbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import shoesbackend.com.shoesbackend.model.Orders;
import shoesbackend.com.shoesbackend.request.CreateOrderAndOrderDetail;
import shoesbackend.com.shoesbackend.response.StatusResponse;
import shoesbackend.com.shoesbackend.service.OrdersService;

@RestController
@RequestMapping("")
@CrossOrigin
public class OrdersController {

    @Autowired 
    private OrdersService ordersService;

    @GetMapping("/list/orders")
    public List<Orders> listOrders(){
        return ordersService.getOrders();
    }

    @GetMapping("/list/orders-by-username")
    public List<Orders> listOrdersByUsername(@RequestParam String username){
        return ordersService.getListOrdersByUsername(username);
    }

    @GetMapping("/order-by-id")
    public Orders getOrderById(@RequestParam int id){
        return ordersService.getOrderBYId(id);
    }

    @PostMapping("/add/orders")
    public ResponseEntity<Object> addOrders(@RequestBody CreateOrderAndOrderDetail coaod){
        ordersService.addOrders(coaod);
        return new ResponseEntity<Object>(new StatusResponse( "add order success"), HttpStatus.OK);
    }
}
