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
@Table(name = "orders")
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "username",nullable = false)
    private User user;

    @Column(name = "date_create_order")
    private LocalDate dateCreated;

    @Column(name = "total_money")
    private int total_money;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "orders")
    @JsonIgnore
    private List<OrderDetail> orderDetails;

    @PrePersist
    public void createAt(){
        this.dateCreated = LocalDate.now();
    }

}
