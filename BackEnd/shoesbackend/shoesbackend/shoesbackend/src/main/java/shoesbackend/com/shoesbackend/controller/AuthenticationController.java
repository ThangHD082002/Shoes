package shoesbackend.com.shoesbackend.controller;

import shoesbackend.com.shoesbackend.security.JwtTokenUtil;
import shoesbackend.com.shoesbackend.defines.AuthToken;
import shoesbackend.com.shoesbackend.model.*;
import shoesbackend.com.shoesbackend.response.ApiResponse;
import shoesbackend.com.shoesbackend.service.UserService;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import shoesbackend.com.shoesbackend.request.CreateUser;
import shoesbackend.com.shoesbackend.request.LoginUser;

import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/token")
@CrossOrigin
public class AuthenticationController {

    @Autowired
	private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/login", method = RequestMethod.POST)

    public ApiResponse<AuthToken> register(@RequestBody LoginUser lUser) throws AuthenticationException, NoSuchAlgorithmException, InvalidKeySpecException {
        List<Role> s = new ArrayList<>();
        int check = userService.checkUser(lUser);
        System.out.println(check);
        if(check == 1){
            final User user = userService.getUserByUsername(lUser.getUsername());
            final String token = jwtTokenUtil.generateToken(user);
            System.out.println(token);
            return new ApiResponse<>(404, "creatae token success",new AuthToken(token, user.getUsername(), user.getRoles()));
        }
        return new ApiResponse<>(200, "create token faild",new AuthToken("","",s));
    }


    // public String Hello(){
    //     return "Hello";
    // }


    // public ApiResponse<Object> register(@RequestBody CreateUser cuser) throws Exception {
    
    //         authenticate(cuser.getUsername(), cuser.getPassword());
    //             final User user = userService.getUserByUsername(cuser.getUsername());
    //             final String token = jwtTokenUtil.generateToken(user);
    //             System.out.println(user.getUsername());
    //             System.out.println(token);
    //             return new ApiResponse<>(200, "ban da dang nhap thanh cong",new AuthToken(token, user.getUsername()));
           
    // }

    // private ApiResponse<Object> authenticate(String username, String password) throws Exception {
	// 	Objects.requireNonNull(username);
	// 	Objects.requireNonNull(password);

	// 	try {
	// 		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
	// 	} catch(Exception e) {
    //         return new ApiResponse<Object>(200, "tai khoan cua ban khong hop le",new AuthToken("",""));
    //     }
    //     return null;
	// }
	// public ApiResponse<Object> createAuthenticationToken(@RequestBody CreateUser cuser)
	// 		throws Exception {

	// 	authenticate(cuser.getUsername(), cuser.getPassword());
    //     System.out.println(cuser.getUsername());
	// 	 final User user = userService.getUserByUsername(cuser.getUsername());
    //      final String token = jwtTokenUtil.generateToken(user);
    //      return new ApiResponse<>(200, "ban da dang nhap thanh cong",new AuthToken(token, user.getUsername()));
	// }

	// private void authenticate(String username, String password) throws Exception {
	// 	Objects.requireNonNull(username);
	// 	Objects.requireNonNull(password);
	// 	try {
	// 		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
	// 	} catch(Exception e) {
    //         System.out.println(e);
    //     }
	// }

}
