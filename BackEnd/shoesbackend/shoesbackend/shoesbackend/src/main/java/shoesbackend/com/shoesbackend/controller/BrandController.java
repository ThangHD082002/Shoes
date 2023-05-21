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
import org.springframework.web.bind.annotation.RestController;

import shoesbackend.com.shoesbackend.model.Brand;
import shoesbackend.com.shoesbackend.request.CreateBrand;
import shoesbackend.com.shoesbackend.response.StatusResponse;
import shoesbackend.com.shoesbackend.service.BrandService;

@RestController
@RequestMapping("")
@CrossOrigin
public class BrandController {

    @Autowired
    private BrandService brandService;

    @GetMapping("/list/brand")
    public List<Brand> getBrands(){
        return brandService.getBrandList();
    }

    @PostMapping("/add/brand")
    public ResponseEntity<Object> AddProductGroup(@RequestBody CreateBrand cBrand){
        brandService.addBrand(cBrand);
        return new ResponseEntity<Object>(new StatusResponse( "add brand success"), HttpStatus.OK);
    } 

}
