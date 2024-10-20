package com.example.Test.service;


import com.example.Test.model.Thuonghieu;
import com.example.Test.repository.ThuonghieuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class ThuonghieuService {

    @Autowired
    private ThuonghieuRepository thuonghieuRepository;

    // Lấy danh sách tất cả sản phẩm
    public List<Thuonghieu> findAll() {
        return thuonghieuRepository.findAll();
    }

    // Tìm sản phẩm theo ID
    public Optional<Thuonghieu> findById(Integer id) {
        return thuonghieuRepository.findById(id);
    }

    // Lưu sản phẩm mới hoặc cập nhật sản phẩm hiện có
    public Thuonghieu save(Thuonghieu thuonghieu) {
        return thuonghieuRepository.save(thuonghieu);
    }

    // Xóa sản phẩm theo ID
    public void deleteById(Integer id) {
        if (!thuonghieuRepository.existsById(id)) {
            throw new IllegalArgumentException("Sản phẩm với ID " + id + " không tồn tại.");
        }
        thuonghieuRepository.deleteById(id);
    }
}
