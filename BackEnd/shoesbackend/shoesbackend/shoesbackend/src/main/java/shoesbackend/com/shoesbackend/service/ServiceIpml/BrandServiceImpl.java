package shoesbackend.com.shoesbackend.service.ServiceIpml;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import shoesbackend.com.shoesbackend.model.Brand;
import shoesbackend.com.shoesbackend.repository.BrandRepository;
import shoesbackend.com.shoesbackend.request.CreateBrand;
import shoesbackend.com.shoesbackend.service.BrandService;

@Service
public class BrandServiceImpl implements BrandService{

    @Autowired
    private BrandRepository brandRepository;
    @Override
    public void addBrand(CreateBrand cBrand) {
        Brand brand = Brand.builder().id(cBrand.getId())
                                      .name(cBrand.getName())
                                      .build();
        brandRepository.save(brand);
    }

    @Override
    public List<Brand> getBrandList() {
        return brandRepository.findAll();
    }
    
}
