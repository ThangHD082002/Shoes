package shoesbackend.com.shoesbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import shoesbackend.com.shoesbackend.model.Color;

public interface ColorRepository extends JpaRepository<Color, Integer> {
    Color findById(int id);
    Color findByName(String name);
}
