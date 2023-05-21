package shoesbackend.com.shoesbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import shoesbackend.com.shoesbackend.request.CreateUserRole;
import shoesbackend.com.shoesbackend.response.StatusResponse;
import shoesbackend.com.shoesbackend.service.UserService;

@RestController
@RequestMapping("")
@CrossOrigin
public class UserRoleController {

    @Autowired
    private UserService userService;


    @GetMapping("/test/user-role")
    public String getUserRole(){
        return "test-user role";
    }
    
    @PostMapping("/add/user-role")
    public ResponseEntity<Object> addUserRole(@RequestBody CreateUserRole cuRole){
        userService.addUserRole(cuRole);
        return new ResponseEntity<Object>(new StatusResponse( "add user role success"), HttpStatus.OK);  
    }
}
