package shoesbackend.com.shoesbackend.service;

import java.util.List;

import shoesbackend.com.shoesbackend.model.ProductSize;
import shoesbackend.com.shoesbackend.request.CreateProductSize;

public interface ProductSizeService {
    void addProductSize(CreateProductSize cpSize);
    List<ProductSize> getProductSizeList();
    List<ProductSize> getProductSizeByProductId(int id);
}
