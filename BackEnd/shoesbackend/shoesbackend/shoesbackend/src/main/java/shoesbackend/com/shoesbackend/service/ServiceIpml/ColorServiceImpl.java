package shoesbackend.com.shoesbackend.service.ServiceIpml;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import shoesbackend.com.shoesbackend.model.Color;
import shoesbackend.com.shoesbackend.repository.ColorRepository;
import shoesbackend.com.shoesbackend.request.CreateColor;
import shoesbackend.com.shoesbackend.service.ColorService;

@Service
public class ColorServiceImpl implements ColorService{


    @Autowired
    private ColorRepository colorRepository;

    @Override
    public void addColor(CreateColor cColor) {
        Color color = Color.builder()
                            .id(cColor.getId())
                            .name(cColor.getName())
                            .build();
        colorRepository.save(color);
    }

    @Override
    public List<Color> getColorList() {
        return colorRepository.findAll();
    }
    
}
