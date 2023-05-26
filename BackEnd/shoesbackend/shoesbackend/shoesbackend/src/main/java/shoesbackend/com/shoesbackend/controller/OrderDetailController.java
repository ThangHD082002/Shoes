package shoesbackend.com.shoesbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import shoesbackend.com.shoesbackend.model.OrderDetail;
import shoesbackend.com.shoesbackend.model.StatusOrderDetail;
import shoesbackend.com.shoesbackend.request.CreateUpdateStatus;
import shoesbackend.com.shoesbackend.response.StatusResponse;
import shoesbackend.com.shoesbackend.service.OrderDetailService;

@RestController
@RequestMapping("")
@CrossOrigin
public class OrderDetailController {
    @Autowired
    private OrderDetailService odService;

    @GetMapping("/list/order-detail")
    public List<OrderDetail> getOrderDetailList(){
        return odService.getOrderDetails();
    }

    @GetMapping("/list/order-detail-by-username")
    public List<OrderDetail> getOrderDetailListByUsername(@RequestParam String userName){
        return odService.getOrderDetailsByUserName(userName);
    }

    @GetMapping("/oders-detail-by-id")
    public OrderDetail getOrderDetailListById(@RequestParam int id){
        return odService.getOdeOrderDetailById(id);
    }

        @PostMapping("/update/order-detail-status")
        public ResponseEntity<Object> updateOrderDetailStatus(@RequestBody CreateUpdateStatus cus){
            StatusOrderDetail s = StatusOrderDetail.valueOf(cus.getSod());
            odService.UpdateStatusOrderDetail(s, cus.getId());
            return new ResponseEntity<Object>(new StatusResponse( "delete product success"), HttpStatus.OK);
        }
}
