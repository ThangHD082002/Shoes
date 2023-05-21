package shoesbackend.com.shoesbackend.service.ServiceIpml;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import shoesbackend.com.shoesbackend.model.Size;
import shoesbackend.com.shoesbackend.repository.SizeRepository;
import shoesbackend.com.shoesbackend.request.CreateSize;
import shoesbackend.com.shoesbackend.service.SizeService;

@Service
public class SizeServiceImpl implements SizeService{

    @Autowired
    private SizeRepository sizeRepository;

    @Override
    public void addSize(CreateSize cSize) {
        Size size = Size.builder()
                            .id(cSize.getId())
                            .name(cSize.getName())
                            .build();

        sizeRepository.save(size);
    }

    @Override
    public List<Size> getSizeList() {
        return sizeRepository.findAll();
    }
    
}
