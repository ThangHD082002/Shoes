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
import org.springframework.web.bind.annotation.RestController;

import shoesbackend.com.shoesbackend.model.ProductGroup;
import shoesbackend.com.shoesbackend.request.CreateProductGroup;
import shoesbackend.com.shoesbackend.response.StatusResponse;
import shoesbackend.com.shoesbackend.service.ProductGroupService;

@RestController
@RequestMapping("")
@CrossOrigin
public class ProductGroupController {


    @Autowired
    private ProductGroupService pgService;

    @GetMapping("/test")
    public String TestProductGroup(){
        return "testProductGroup";
    }

    @PostMapping("/add/product-group")
    public ResponseEntity<Object> AddProductGroup(@RequestBody CreateProductGroup cpGroup){
        pgService.addProductGroup(cpGroup);
        return new ResponseEntity<Object>(new StatusResponse( "add product group success"), HttpStatus.OK);
    } 

    @GetMapping("/list/product-group")
    public List<ProductGroup> ListProduct(){
        return pgService.getProductGroups();
    }
}
