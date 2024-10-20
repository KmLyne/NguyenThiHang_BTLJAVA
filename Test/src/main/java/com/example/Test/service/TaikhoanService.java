package com.example.Test.service;

import com.example.Test.model.Taikhoan;
import com.example.Test.repository.TaikhoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaikhoanService {
    @Autowired
    private TaikhoanRepository taikhoanRepository;

    // Lấy danh sách tất cả sản phẩm
    public List<Taikhoan> findAll() {
        return taikhoanRepository.findAll();
    }

    // Tìm sản phẩm theo ID
    public Optional<Taikhoan> findById(Integer id) {
        return taikhoanRepository.findById(id);
    }

    // Lưu sản phẩm mới hoặc cập nhật sản phẩm hiện có
    public Taikhoan save(Taikhoan taikhoan) {
        return taikhoanRepository.save(taikhoan);
    }

    // Xóa sản phẩm theo ID
    public void deleteById(Integer id) {
        if (!taikhoanRepository.existsById(id)) {
            throw new IllegalArgumentException("Sản phẩm với ID " + id + " không tồn tại."); // Kiểm tra tồn tại
        }
        taikhoanRepository.deleteById(id);
    }
    //Dang nhap
    // Tìm tài khoản theo tên đăng nhập
    public Optional<Taikhoan> findByEmail(String email) {
        return taikhoanRepository.findByEmail(email);
    }

}
