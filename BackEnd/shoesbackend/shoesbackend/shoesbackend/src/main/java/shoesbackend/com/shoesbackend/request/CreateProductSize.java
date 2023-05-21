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
public class CreateProductSize {
    private int id;
    private int product_id;
    private int size_id;
    private int color_id;
    private int quantity_bunker;
}
