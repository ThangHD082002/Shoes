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

import shoesbackend.com.shoesbackend.model.Color;
import shoesbackend.com.shoesbackend.request.CreateColor;
import shoesbackend.com.shoesbackend.response.StatusResponse;
import shoesbackend.com.shoesbackend.service.ColorService;

@RestController
@RequestMapping("")
@CrossOrigin
public class ColorController {
    @Autowired
    private ColorService colorService;

    @GetMapping("/list-color")
    public List<Color> getListColor(){
        return colorService.getColorList();
    }

    @PostMapping("/add/color")
    public ResponseEntity<Object> AddProductGroup(@RequestBody CreateColor cColor){
        colorService.addColor(cColor);
        return new ResponseEntity<Object>(new StatusResponse( "add color success"), HttpStatus.OK);
    } 

    
}
