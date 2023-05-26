package shoesbackend.com.shoesbackend.request;

import java.util.List;

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
public class CreateOrderAndOrderDetail {
    private String username;
    private String name;
    private String phone;
    private String address;
    private String totalAll;
    List<CreateOrderDetail> orderDetails;
}
