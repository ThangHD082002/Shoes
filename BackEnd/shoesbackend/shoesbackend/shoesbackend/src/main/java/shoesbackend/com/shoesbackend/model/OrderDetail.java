package shoesbackend.com.shoesbackend.model;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

import lombok.*;

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "order_detail")
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "username",nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "order_id",nullable = false)
    private Orders orders;

    @ManyToOne
    @JoinColumn(name = "product_id",nullable = false)
    private Product product;

    @Column(name = "quantity_order")
    private int quantity_order;

    @Column(name = "price")
    private double price;

    @ManyToOne
    @JoinColumn(name = "size_id",nullable = false)
    private Size size;

    @ManyToOne
    @JoinColumn(name = "color_id",nullable = false)
    private Color color;

    @Column(name = "address")
    private String address;

    @Column(name = "phone")
    private String phone;

    @Column(name = "name")
    private String name;

    @Column(name = "status")
    private StatusOrderDetail sod;

    @Column(name = "date_create_order_detail")
    private LocalDate dateCreated;

    @PrePersist
    public void createAt(){
        this.dateCreated = LocalDate.now();
    }



}
