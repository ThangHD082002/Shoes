package shoesbackend.com.shoesbackend.service;

import java.util.List;

import shoesbackend.com.shoesbackend.model.Size;
import shoesbackend.com.shoesbackend.request.CreateSize;

public interface SizeService {
    void addSize(CreateSize cSize);
    List<Size> getSizeList();
}
