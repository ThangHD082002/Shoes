package shoesbackend.com.shoesbackend.controller;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.text.ParseException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import shoesbackend.com.shoesbackend.model.User;
import shoesbackend.com.shoesbackend.request.CreateUpdateUser;
import shoesbackend.com.shoesbackend.request.CreateUser;
import shoesbackend.com.shoesbackend.request.CreateUserByRole;
import shoesbackend.com.shoesbackend.request.LoginUser;
import shoesbackend.com.shoesbackend.response.StatusResponse;
import shoesbackend.com.shoesbackend.service.UserService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("")
@CrossOrigin
public class UserController {


    @Autowired
    UserService userService;

    @GetMapping("")
    public String cors(){
        return "corrs";
    }

    @GetMapping("/users")
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @PostMapping("/add/user")
    public ResponseEntity<Object> saveUser(@RequestBody CreateUser cuser) throws NoSuchAlgorithmException, InvalidKeySpecException, ParseException {
        boolean check = userService.registerUser(cuser);
        if(check == true){
            return new ResponseEntity<Object>(new StatusResponse( "Register Success"), HttpStatus.OK);
        }
        return new ResponseEntity<Object>(new StatusResponse( "Register Faild"), HttpStatus.OK);
    }

    @GetMapping("/login")
    public ResponseEntity<Object> Login(@RequestBody LoginUser lUser) throws NoSuchAlgorithmException, InvalidKeySpecException {
        if(userService.checkUser(lUser) == 1){
            return new ResponseEntity<Object>(new StatusResponse( "ban da dang nhap thanh cong"), HttpStatus.OK);
        }
        else if(userService.checkUser(lUser) == 2){
            return new ResponseEntity<Object>(new StatusResponse("ban da nhap sai mat khau"), HttpStatus.OK);
        }
            return new ResponseEntity<Object>(new StatusResponse("tai khoan khong ton tai"), HttpStatus.OK);
        
        
    } 

    @GetMapping("/users-by-role")
    public List<User> getUserByRole(@RequestParam String role){
        return userService.getUserByRole(role);
    }

    @GetMapping("/user-by-username-and-role")
    public List<User> getUserByUsernameAndRole(@RequestParam String username, @RequestParam String role){
        return userService.getUserByRoleAndName(username, role);
    }

    @GetMapping("/user-by-username-and-role-one")
    public List<User> getUserByUsernameAndRoleOne(@RequestParam String username, @RequestParam String role){
        return userService.getUserByRoleAndName(username, role);
    }

    @PostMapping("/update-user")
    public ResponseEntity<Object> updateUser(@RequestBody CreateUpdateUser cuu){
        userService.UpdateUser(cuu);
        return new ResponseEntity<Object>(new StatusResponse("update thành công"), HttpStatus.OK);

    }

    // @GetMapping("/test")
    // public String getTest(){
    //     return "test";
    // }
    
}
