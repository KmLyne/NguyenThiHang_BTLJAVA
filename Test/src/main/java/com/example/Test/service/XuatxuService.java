package com.example.Test.service;

import com.example.Test.model.Xuatxu;
import com.example.Test.repository.XuatxuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class XuatxuService {

    @Autowired
    private XuatxuRepository xuatxuRepository;

    // Lấy danh sách tất cả sản phẩm
    public List<Xuatxu> findAll() {
        return xuatxuRepository.findAll();
    }

    // Tìm sản phẩm theo ID
    public Optional<Xuatxu> findById(Integer id) {
        return xuatxuRepository.findById(id);
    }

    // Lưu sản phẩm mới hoặc cập nhật sản phẩm hiện có
    public Xuatxu save(Xuatxu xuatxu) {
        return xuatxuRepository.save(xuatxu);
    }

    // Xóa sản phẩm theo ID
    public void deleteById(Integer id) {
        if (!xuatxuRepository.existsById(id)) {
            throw new IllegalArgumentException("Sản phẩm với ID " + id + " không tồn tại."); // Kiểm tra tồn tại
        }
        xuatxuRepository.deleteById(id);
    }
}
