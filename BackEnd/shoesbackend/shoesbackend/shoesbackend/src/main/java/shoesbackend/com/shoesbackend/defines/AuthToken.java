package shoesbackend.com.shoesbackend.defines;

import java.util.List;

import shoesbackend.com.shoesbackend.model.Role;

public class AuthToken {

    private String token;
    private String username;
    private List<Role> listRole;

    public AuthToken(){

    }

    public AuthToken(String token, String username, List<Role> listRole){
        this.token = token;
        this.listRole = listRole;
        this.username = username;
    }



    public AuthToken(String token){
        this.token = token;
    }

    public List<Role> getListRole(){
        return listRole;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setListRole(List<Role> list) {
        this.listRole = list;
    }

}
