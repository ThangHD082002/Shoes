package shoesbackend.com.shoesbackend.service;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.text.ParseException;
import java.util.List;
import java.util.Optional;

import shoesbackend.com.shoesbackend.model.User;
import shoesbackend.com.shoesbackend.request.CreateUpdateUser;
import shoesbackend.com.shoesbackend.request.CreateUser;
import shoesbackend.com.shoesbackend.request.CreateUserByRole;
import shoesbackend.com.shoesbackend.request.CreateUserRole;
import shoesbackend.com.shoesbackend.request.LoginUser;

public interface UserService {
    List<User> getUsers();
    boolean registerUser(CreateUser cuser) throws NoSuchAlgorithmException, InvalidKeySpecException, ParseException;
    int checkUser(LoginUser lUser) throws NoSuchAlgorithmException, InvalidKeySpecException;
    User getUserByUsername(String username) throws NoSuchAlgorithmException, InvalidKeySpecException;
    void addUserRole(CreateUserRole cuRole);
    List<User> getUserByRole(String role);
    List<User> getUserByRoleAndName(String username, String role);
    Optional<User> getUserByRoleAndNameOne(String username, String role);
    void UpdateUser(CreateUpdateUser cuu);
}
