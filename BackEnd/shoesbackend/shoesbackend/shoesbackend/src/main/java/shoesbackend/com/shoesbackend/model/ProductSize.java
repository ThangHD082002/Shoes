package shoesbackend.com.shoesbackend.model;


import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;
@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "product_size")
public class ProductSize {
    @Id
    private int id;

    @ManyToOne
    @JoinColumn(name = "product_id",  nullable = false)
    private Product product;

    @ManyToOne
    @JoinColumn(name = "size_id", nullable = false)
    private Size size;


    @ManyToOne
    @JoinColumn(name = "color_id" , nullable = false)
    private Color color;

    @Column(name = "quantity_bunker")
    private int quantity_bunker;

    @Column(name = "status")
    private StatusProduct sp;
}
