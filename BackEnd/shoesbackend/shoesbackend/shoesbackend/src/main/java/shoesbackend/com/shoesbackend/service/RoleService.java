package shoesbackend.com.shoesbackend.service;

import java.util.List;

import shoesbackend.com.shoesbackend.model.Product;
import shoesbackend.com.shoesbackend.model.Role;

public interface RoleService {
    List<Role> getRoles();
    Role saveRole(Role role);
    boolean deleteRoleByName(String name);
    Role getRoleByName(String name);
    
}
