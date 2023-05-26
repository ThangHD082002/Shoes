package shoesbackend.com.shoesbackend.service.ServiceIpml;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import shoesbackend.com.shoesbackend.hash.Hashing;
import shoesbackend.com.shoesbackend.model.Role;
import shoesbackend.com.shoesbackend.model.StatusUser;
import shoesbackend.com.shoesbackend.model.User;
import shoesbackend.com.shoesbackend.repository.RoleRepository;
import shoesbackend.com.shoesbackend.repository.UserRepository;
import shoesbackend.com.shoesbackend.request.CreateUpdateUser;
import shoesbackend.com.shoesbackend.request.CreateUser;
import shoesbackend.com.shoesbackend.request.CreateUserByRole;
import shoesbackend.com.shoesbackend.request.CreateUserRole;
import shoesbackend.com.shoesbackend.request.LoginUser;
import shoesbackend.com.shoesbackend.service.RoleService;
import shoesbackend.com.shoesbackend.service.UserService;


@Service
@Transactional
public class UserServiceImpl implements UserService, UserDetailsService {


    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    RoleService rService;

    @Autowired Hashing hash;

    @Autowired
    private BCryptPasswordEncoder bcryptEncoder;


    private static final Logger logger = LoggerFactory.getLogger( UserService.class);
    

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if(user == null){
            logger.error("User not exist");
            throw new UsernameNotFoundException("user not exist");
        }
        logger.error("User found data");
        return UserDetailsImplement.build(user);
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public boolean registerUser(CreateUser cuser) throws NoSuchAlgorithmException, InvalidKeySpecException, ParseException {
        User user = userRepository.findByUsername(cuser.getUsername());
        if(user == null){
            User u = new User();
            u.setUsername(cuser.getUsername());
            u.setHash_pass(hash.hashPassword(cuser.getPassword()));
            u.setSu(StatusUser.Active);
            u.setGender(cuser.getGender());
            u.setPhone(cuser.getPhone());
            userRepository.save(u); 
            return true;    
        }
        return false;
    }

    @Override
    public int checkUser(LoginUser lUser) throws NoSuchAlgorithmException, InvalidKeySpecException {
        // String hashPass = hash.hashPassword(lUser.getPassword());
        User u = userRepository.findByUsername(lUser.getUsername());   
        if(u != null){
            boolean check = hash.ValidatePassword(lUser.getPassword(), u.getHash_pass());
            if(check == false){
                return 2;
            }
            else{
                return 1;
            }
        }
        return 3;
    }

    @Override
    public User getUserByUsername(String username)  {
        return userRepository.findByUsername(username);

    }

    @Override
    public void addUserRole(CreateUserRole cuRole) {
        User u = userRepository.findByUsername(cuRole.getUsername());
        Role role = roleRepository.findById(cuRole.getRole_id());
        List<Role> roles = u.getRoles();
        roles.add(role);
        u.setRoles(roles);
        // for(Role r : u.getRoles()) {
        //     System.out.println(r.getName());
        // }
        userRepository.save(u);
    }

    @Override
    public List<User> getUserByRole(String role) {
        Role r = rService.getRoleByName(role);
        List<User> lu = r.getUsers();
        return lu;
    }

    @Override
    public List<User> getUserByRoleAndName(String username, String role) {
        return userRepository.findByUsernameAndRole(username, role);
    }

    @Override
    public Optional<User> getUserByRoleAndNameOne(String username, String role) {
        return userRepository.findByUsernameAndRoleOne(username, role);
    }

    @Override
    public void UpdateUser(CreateUpdateUser cuu) {
        Optional<User> u = userRepository.findByUsernameAndRoleOne(cuu.getUsername(),cuu.getRoleOld());
        User user = u.get();
        user.setUsername(cuu.getUsername());
        user.setPhone(cuu.getPhone());
        user.setGender(cuu.getGender());
        StatusUser su = StatusUser.valueOf(cuu.getStatus());
        user.setSu(su);
        Optional<Role> role = roleRepository.findByName(cuu.getRole());
        Role r = role.get();
        List<Role> lr = new ArrayList<Role>();
        lr.add(r);
        user.setRoles(lr);
        userRepository.save(user);
    }    

   
    
}
