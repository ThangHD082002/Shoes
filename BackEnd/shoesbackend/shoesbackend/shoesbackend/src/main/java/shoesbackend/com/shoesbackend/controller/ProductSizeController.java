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

import shoesbackend.com.shoesbackend.model.ProductSize;
import shoesbackend.com.shoesbackend.request.CreateProductSize;
import shoesbackend.com.shoesbackend.response.StatusResponse;
import shoesbackend.com.shoesbackend.service.ProductSizeService;



@RestController
@RequestMapping("")
@CrossOrigin
public class ProductSizeController {
    @Autowired
    private ProductSizeService psService;

    @GetMapping("/list-product-size")
    public List<ProductSize> listProductSize(){
        return psService.getProductSizeList();
    }

    @GetMapping("/infor/product")
    public List<ProductSize> listProductSize(@RequestParam String id){
        int ma = Integer.parseInt(id);
        return psService.getProductSizeByProductId(ma);
    }

    @PostMapping("/add/product-size")
    public ResponseEntity<Object> AddProductGroup(@RequestBody CreateProductSize cpSize){
        psService.addProductSize(cpSize);
        return new ResponseEntity<Object>(new StatusResponse( "add product-size success"), HttpStatus.OK);
    } 


}
