package shoesbackend.com.shoesbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import shoesbackend.com.shoesbackend.model.Role;
import shoesbackend.com.shoesbackend.repository.RoleRepository;
import shoesbackend.com.shoesbackend.service.RoleService;

@RestController
@RequestMapping("")
@CrossOrigin
public class RoleController {

    @Autowired
    RoleService roleService;

    @GetMapping("/list-role")
    public List<Role> getRoles(){
        return roleService.getRoles();
    }

    @PostMapping("/add/role")
    public Role saveRole(@RequestBody Role role){
        return roleService.saveRole(role);
    }

    @GetMapping("/test-role")
    public String TestRole(){
        return "test-role";
    }

    
}
