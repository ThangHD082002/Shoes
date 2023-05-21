package shoesbackend.com.shoesbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import shoesbackend.com.shoesbackend.model.Product;
import shoesbackend.com.shoesbackend.request.CreateProduct;
import shoesbackend.com.shoesbackend.response.StatusResponse;
import shoesbackend.com.shoesbackend.service.ProductService;

@RestController
@RequestMapping("")
@CrossOrigin
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/list/product")
    public List<Product> getProducts() {
        return productService.getProducts();
    }

    @GetMapping("/list/product-brand")
    public List<Product> getProductsBrand(@RequestParam String id){
        int ma = Integer.parseInt(id);
        return productService.getProductsByBrId(ma);
    }

    @GetMapping("/id/product")
    public Product getProductById(@RequestParam String id){
        int ma = Integer.parseInt(id);
        return productService.getProductById(ma);
    }



    @PostMapping("/add/product")
    public ResponseEntity<Object> AddProductGroup(@RequestBody CreateProduct cProduct){
        productService.addProduct(cProduct);
        return new ResponseEntity<Object>(new StatusResponse( "add product success"), HttpStatus.OK);
    } 

    @DeleteMapping("/delete/product")
    public ResponseEntity<Object> deleteProduct(@RequestParam String id){
        int ma = Integer.parseInt(id);
        productService.deleteProduct(ma);
        return new ResponseEntity<Object>(new StatusResponse( "delete product success"), HttpStatus.OK);
    }

}
