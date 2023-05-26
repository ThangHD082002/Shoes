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
@Table(name = "product")
public class Product {
    @Id
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private double price;

    @Column(name = "sl")
    private int sl;

    @Column(name = "img")
    private String img;

    @Column(name = "description")
    private String description;


    @OneToMany(cascade = CascadeType.ALL,mappedBy = "product")
    @JsonIgnore
    private List<ProductSize> productSizes;

    @ManyToOne
    @JoinColumn(name = "brand_id",nullable = false)
    private Brand brand;

    @ManyToOne
    @JoinColumn(name = "pg_id", nullable = false)
    private ProductGroup productGroup;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "product")
    @JsonIgnore
    private List<OrderDetail> orderDetails;

}
