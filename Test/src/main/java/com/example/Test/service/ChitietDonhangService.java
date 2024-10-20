package com.example.Test.service;

import com.example.Test.model.ChitietDonhang;
import com.example.Test.model.Sanpham;
import com.example.Test.repository.ChitietDonhangRepository;
import com.example.Test.repository.SanphamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChitietDonhangService {

    @Autowired
    private ChitietDonhangRepository chitietDonhangRepository;

    @Autowired
    private SanphamRepository sanphamRepository;

    // Lấy tất cả chi tiết đơn hàng
    public List<ChitietDonhang> findAll() {
        return chitietDonhangRepository.findAll();
    }

    // Lấy chi tiết đơn hàng theo mã đơn hàng (MaDH)
    public List<ChitietDonhang> findByMaDH(Integer madh) {
        return chitietDonhangRepository.findByMadh(madh);
    }

    // Lưu chi tiết đơn hàng (tạo mới hoặc cập nhật)
    public ChitietDonhang save(ChitietDonhang chitietDonhang) {
        return chitietDonhangRepository.save(chitietDonhang);
    }

    // Xóa chi tiết đơn hàng theo mã chi tiết đơn hàng (MaCT)
    public void deleteById(Integer mact) {
        chitietDonhangRepository.deleteById(mact);
    }

    // Xóa tất cả chi tiết đơn hàng theo mã đơn hàng (MaDH)
    public void deleteByMadh(Integer madh) {
        chitietDonhangRepository.deleteByMadh(madh);  // Delegate deletion to repository
    }

    // Lấy chi tiết đơn hàng theo mã chi tiết đơn hàng (MaCT)
    public Optional<ChitietDonhang> getChitietDonhangByMact(Integer mact) {
        return chitietDonhangRepository.findById(mact);  // Return Optional to handle missing entities properly
    }

    // Lấy chi tiết đơn hàng theo mã đơn hàng (MaDH)
    public List<ChitietDonhang> getChitietDonhangByMadh(Integer madh) {
        return chitietDonhangRepository.findByMadh(madh);
    }

    // Lấy sản phẩm từ mã sản phẩm (MaSP)
    public Optional<Sanpham> getSanphamById(Integer masp) {
        return sanphamRepository.findById(masp);
    }
    // Method to fetch order details by madh (order ID)
    public List<ChitietDonhang> getChitietDonhangByDonhangId(Integer madh) {
        // Retrieve the order details based on madh
        return chitietDonhangRepository.findByMadh(madh);
    }
    public List<ChitietDonhang> getChiTietDonHangByDonHangId(Integer madh) {
        return chitietDonhangRepository.findByMadh(madh);
    }
    // Method to get all orders for a user
    public List<ChitietDonhang> findByUserId(Integer userId) {
        return chitietDonhangRepository.findByUserId(userId);
    }
}
