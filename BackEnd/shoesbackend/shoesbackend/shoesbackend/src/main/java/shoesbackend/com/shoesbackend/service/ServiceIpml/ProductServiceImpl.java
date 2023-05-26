package shoesbackend.com.shoesbackend.service.ServiceIpml;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import shoesbackend.com.shoesbackend.model.Brand;
import shoesbackend.com.shoesbackend.model.Product;
import shoesbackend.com.shoesbackend.model.ProductGroup;
import shoesbackend.com.shoesbackend.repository.BrandRepository;
import shoesbackend.com.shoesbackend.repository.ProductGroupRepository;
import shoesbackend.com.shoesbackend.repository.ProductRepository;
import shoesbackend.com.shoesbackend.request.CreateProduct;
import shoesbackend.com.shoesbackend.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService{

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductGroupRepository pgRepository;

    @Autowired
    private BrandRepository brandRepository;

    @Override
    public void addProduct(CreateProduct cProduct) {
        Brand br = brandRepository.findById(cProduct.getBrand_id());
        ProductGroup pg = pgRepository.findById(cProduct.getPg_id());
        Product product = Product.builder()
                                    .id(cProduct.getId())
                                    .description(cProduct.getDescription())
                                    .name(cProduct.getName())
                                    .img(cProduct.getImg())
                                    .price(cProduct.getPrice())
                                    .sl(cProduct.getSl())
                                    .brand(br)
                                    .productGroup(pg)
                                    .build();
        productRepository.save(product);
    }

    @Override
    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    @Override
    public void deleteProduct(int id) {
        productRepository.deleteById(id);
    }

    @Override
    public List<Product> getProductsByBrId(int id) {
        return productRepository.findByBrand_Id(id);
    }

    @Override
    public Product getProductById(int id) {
        return productRepository.findById(id);
    }

    @Override
    public List<Product> findIndex(int i) {
        Pageable pageable = PageRequest.of(i, 10);
        return productRepository.findProductsFromIndex(i, pageable);
    }

    @Override
    public List<Product> findByName(String name) {
        return productRepository.findByName(name);
    }
    
}
