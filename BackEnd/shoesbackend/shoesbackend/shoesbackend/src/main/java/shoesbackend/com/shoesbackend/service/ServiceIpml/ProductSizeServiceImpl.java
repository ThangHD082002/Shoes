package shoesbackend.com.shoesbackend.service.ServiceIpml;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import shoesbackend.com.shoesbackend.model.Color;
import shoesbackend.com.shoesbackend.model.Product;
import shoesbackend.com.shoesbackend.model.ProductSize;
import shoesbackend.com.shoesbackend.model.Size;
import shoesbackend.com.shoesbackend.repository.ColorRepository;
import shoesbackend.com.shoesbackend.repository.ProductRepository;
import shoesbackend.com.shoesbackend.repository.ProductSizeRepository;
import shoesbackend.com.shoesbackend.repository.SizeRepository;
import shoesbackend.com.shoesbackend.request.CreateProductSize;
import shoesbackend.com.shoesbackend.service.ProductSizeService;

@Service
public class ProductSizeServiceImpl implements ProductSizeService{


    @Autowired
    private ProductSizeRepository psRepository;

    @Autowired
    private ProductRepository pRepository;

    @Autowired 
    private SizeRepository sRepository;

    @Autowired
    private ColorRepository cRepository;

    @Override
    public void addProductSize(CreateProductSize cpSize) {
        Product p = pRepository.findById(cpSize.getProduct_id());
        Size s = sRepository.findById(cpSize.getSize_id());
        Color c = cRepository.findById(cpSize.getColor_id());

        ProductSize ps = ProductSize.builder()
                                    .id(cpSize.getId())
                                    .product(p)
                                    .size(s)
                                    .color(c)
                                    .quantity_bunker(cpSize.getQuantity_bunker())
                                    .build();
        psRepository.save(ps);

    }

    @Override
    public List<ProductSize> getProductSizeList() {
        return psRepository.findAll();
    }

    @Override
    public List<ProductSize> getProductSizeByProductId(int id) {
        return psRepository.findByProduct_id(id);
    }
    
}
