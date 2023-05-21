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
public class CreateProduct {
    private int id;
    private String description;
    private String name;
    private String img;
    private double price;
    private int sl;
    private int brand_id;
    private int pg_id;

}
