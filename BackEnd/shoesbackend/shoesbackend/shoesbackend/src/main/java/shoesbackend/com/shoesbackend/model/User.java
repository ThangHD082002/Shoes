package shoesbackend.com.shoesbackend.model;

import java.time.LocalDate;
import java.util.Date;
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
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "user")
public class User {
    @Id
    @Column(length = 50)
    private String username;

    @Column(name = "hash_pass")
    @JsonIgnore
    private String hash_pass;

    @Column(name = "status")
    private StatusUser su;

    @Column(name = "gender")
    private String gender;

    @Column(name = "phone")
    private String phone;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(name = "user_role", 
    joinColumns = @JoinColumn(name = "username"), 
    inverseJoinColumns = @JoinColumn(name = "role_id"))
    private List<Role> roles ; 

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Orders> orders;


    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<OrderDetail> ordersDetails;

    @Column(name = "date_create")
    private LocalDate dateCreated;

    @PrePersist
    public void createAt(){
        this.dateCreated = LocalDate.now();
    }


}
