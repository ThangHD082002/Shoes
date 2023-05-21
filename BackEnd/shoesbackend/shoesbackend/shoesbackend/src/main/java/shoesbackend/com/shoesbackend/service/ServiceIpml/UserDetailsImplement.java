package shoesbackend.com.shoesbackend.service.ServiceIpml;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.annotation.JsonIgnore;


import shoesbackend.com.shoesbackend.model.Role;
import shoesbackend.com.shoesbackend.model.User;
import shoesbackend.com.shoesbackend.repository.UserRepository;
import shoesbackend.com.shoesbackend.service.UserService;


public class UserDetailsImplement implements UserDetails {

    private String username;
    // private Object details;
    @JsonIgnore
    private String password;
    private Collection<? extends GrantedAuthority> authorities;

    public UserDetailsImplement( String username, String password,
            Collection<? extends GrantedAuthority> authorities) {
        this.username = username;
        this.password = password;
        this.authorities = authorities;
    }

    public static UserDetailsImplement build(User user) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        int n =user.getRoles().size();
        System.out.println(n);
        for(int i = 0; i < n; i++){
            authorities.add(new SimpleGrantedAuthority(user.getRoles().get(i).getName()));
        }
        
        
        return new UserDetailsImplement(
                user.getUsername(),
                user.getHash_pass(),
                authorities);
    }

    @Override
    public String getPassword() {

        return password;
    }

    @Override
    public String getUsername() {

        return username;
    }


    @Override
    public boolean isAccountNonExpired() {

        return true;
    }

    @Override
    public boolean isAccountNonLocked() {

        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {

        return true;
    }

    @Override
    public boolean isEnabled() {

        return true;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return authorities;
    }
}
