package com.example.Test.service;

import com.example.Test.model.Sanpham;
import com.example.Test.repository.SanphamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

@Service
public class SanphamService {

    @Autowired
    private SanphamRepository sanphamRepository;

    // Lấy danh sách tất cả sản phẩm
    public List<Sanpham> findAll() {
        return sanphamRepository.findAll();
    }

    // Tìm sản phẩm theo ID
    public Optional<Sanpham> findById(Integer id) {
        return sanphamRepository.findById(id);
    }

    // Lưu sản phẩm mới hoặc cập nhật sản phẩm hiện có
    public Sanpham save(Sanpham sanpham) {
        return sanphamRepository.save(sanpham);
    }

    // Xóa sản phẩm theo ID
    public void deleteById(Integer id) {
        if (!sanphamRepository.existsById(id)) {
            throw new IllegalArgumentException("Sản phẩm với ID " + id + " không tồn tại."); // Kiểm tra tồn tại
        }
        sanphamRepository.deleteById(id);
    }

    // Phân trang
    public Page<Sanpham> findAllPaged(Pageable pageable) {
        return sanphamRepository.findAll(pageable);
    }
}
