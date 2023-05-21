package shoesbackend.com.shoesbackend.service;

import java.util.List;

import shoesbackend.com.shoesbackend.model.Product;
import shoesbackend.com.shoesbackend.request.CreateProduct;

public interface ProductService {
    void addProduct(CreateProduct cProduct);
    List<Product> getProducts();
    void deleteProduct(int id);
    List<Product> getProductsByBrId(int id);
    Product getProductById(int id);
}
