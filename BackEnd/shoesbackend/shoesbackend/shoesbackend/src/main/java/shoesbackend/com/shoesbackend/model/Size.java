package shoesbackend.com.shoesbackend.model;


import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "sizes")
public class Size {
    @Id
    private int id;

    @Column(name = "name")
    private String name;

    // @ManyToMany(mappedBy = "productSizes")
    // private Set<Product> sizeProducts;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "size")
    @JsonIgnore
    private List<ProductSize> productSizes ;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "size")
    @JsonIgnore
    private List<OrderDetail> orderDetails ;
}
