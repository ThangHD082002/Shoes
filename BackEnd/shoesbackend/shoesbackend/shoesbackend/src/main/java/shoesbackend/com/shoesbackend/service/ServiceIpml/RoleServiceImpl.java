package shoesbackend.com.shoesbackend.service.ServiceIpml;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import shoesbackend.com.shoesbackend.model.Role;
import shoesbackend.com.shoesbackend.repository.RoleRepository;
import shoesbackend.com.shoesbackend.service.RoleService;
@Service
public class RoleServiceImpl implements RoleService {


    @Autowired
    private RoleRepository roleRepository;

    @Override
    public List<Role> getRoles() {
        return roleRepository.findAll();
    }

    @Override
    public Role saveRole(Role role) {
        return roleRepository.save(role);
    }

    @Override
    public boolean deleteRoleByName(String name) {
        Optional<Role> r = roleRepository.findByName(name);
        boolean check = false;
        if(r.isPresent()) {
            roleRepository.deleteByName(name);
            check = true;
        }
        return check;
        
    }

    @Override
    public Role getRoleByName(String name) {
        Optional<Role> r = roleRepository.findByName(name);
        Role role = new Role();
        if(r.isPresent()) {
            role = r.get();
        }
        return role;
    }
    
}
