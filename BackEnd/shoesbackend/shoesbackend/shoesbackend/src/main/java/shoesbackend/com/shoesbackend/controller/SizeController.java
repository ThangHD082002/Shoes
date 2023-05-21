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

import shoesbackend.com.shoesbackend.model.Size;
import shoesbackend.com.shoesbackend.request.CreateSize;
import shoesbackend.com.shoesbackend.response.StatusResponse;
import shoesbackend.com.shoesbackend.service.SizeService;

@RestController
@RequestMapping("")
@CrossOrigin
public class SizeController {

    @Autowired
    private SizeService sizeService;

    @GetMapping("/list-size")
    public List<Size> listSize() {
        return sizeService.getSizeList();
    }

    @PostMapping("/add/size")
    public ResponseEntity<Object> AddProductGroup(@RequestBody CreateSize cSize){
        sizeService.addSize(cSize);
        return new ResponseEntity<Object>(new StatusResponse( "add size success"), HttpStatus.OK);
    } 
}
