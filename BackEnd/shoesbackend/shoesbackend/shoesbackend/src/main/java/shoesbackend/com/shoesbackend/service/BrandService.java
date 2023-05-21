package shoesbackend.com.shoesbackend.service;

import java.util.List;

import shoesbackend.com.shoesbackend.model.Brand;
import shoesbackend.com.shoesbackend.request.CreateBrand;

public interface BrandService {
    void addBrand(CreateBrand cBrand);
    List<Brand> getBrandList();
}
