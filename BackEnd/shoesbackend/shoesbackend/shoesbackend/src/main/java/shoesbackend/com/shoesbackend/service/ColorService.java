package shoesbackend.com.shoesbackend.service;

import java.util.List;

import shoesbackend.com.shoesbackend.model.Color;
import shoesbackend.com.shoesbackend.request.CreateColor;

public interface ColorService {
    void addColor(CreateColor cColor);
    List<Color> getColorList();
}
