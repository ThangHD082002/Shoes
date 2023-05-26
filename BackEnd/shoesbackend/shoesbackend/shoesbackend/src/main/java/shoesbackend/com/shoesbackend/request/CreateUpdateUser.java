package shoesbackend.com.shoesbackend.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CreateUpdateUser {
    private String username;
    private String phone;
    private String gender;
    private String status;
    private String roleOld;
    private String role;
}
