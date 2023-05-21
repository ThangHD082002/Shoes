package shoesbackend.com.shoesbackend.service;

import java.util.List;

import shoesbackend.com.shoesbackend.model.ProductGroup;
import shoesbackend.com.shoesbackend.request.CreateProductGroup;

public interface ProductGroupService {
    void addProductGroup(CreateProductGroup cpGroup);
    List<ProductGroup> getProductGroups();
}
