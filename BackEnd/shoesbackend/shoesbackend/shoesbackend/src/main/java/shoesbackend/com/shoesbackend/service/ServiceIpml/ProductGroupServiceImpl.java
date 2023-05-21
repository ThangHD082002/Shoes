package shoesbackend.com.shoesbackend.service.ServiceIpml;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import shoesbackend.com.shoesbackend.model.ProductGroup;
import shoesbackend.com.shoesbackend.repository.ProductGroupRepository;
import shoesbackend.com.shoesbackend.request.CreateProductGroup;
import shoesbackend.com.shoesbackend.service.ProductGroupService;

@Service
public class ProductGroupServiceImpl implements ProductGroupService{

    @Autowired
    ProductGroupRepository pgRepository;

    @Override
    public void addProductGroup(CreateProductGroup cpGroup) {
        ProductGroup pgGroup = ProductGroup.builder()
                                             .id(cpGroup.getId())
                                             .name(cpGroup.getName())
                                             .build();
        pgRepository.save(pgGroup);
    }

    @Override
    public List<ProductGroup> getProductGroups() {
        return pgRepository.findAll();
    }
    
}
