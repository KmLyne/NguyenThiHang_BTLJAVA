package com.example.Test.service;

import com.example.Test.model.ChitietDonhang;
import com.example.Test.model.Donhang;
import com.example.Test.model.OrderHistoryResponse;
import com.example.Test.repository.ChitietDonhangRepository;
import com.example.Test.repository.DonhangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class DonhangService {

    @Autowired
    private DonhangRepository donhangRepository;

    @Autowired
    private ChitietDonhangRepository chitietdonhangRepository;

    // Lấy danh sách tất cả đơn hàng
    public List<Donhang> findAll() {
        return donhangRepository.findAll();
    }

    // Tìm đơn hàng theo ID
    public Optional<Donhang> findById(Integer id) {
        return donhangRepository.findById(id);
    }

    // Lưu đơn hàng mới hoặc cập nhật đơn hàng hiện có
    public Donhang save(Donhang donhang) {
        return donhangRepository.save(donhang);
    }

    //Lấy mã đơn hàng để xem chi tiết đơn hàng

    // Xóa đơn hàng theo ID
    @Transactional
    public void deleteDonhang(Integer id) {
        // Tìm đơn hàng theo ID
        Optional<Donhang> optionalOrder = donhangRepository.findById(id);
        if (optionalOrder.isPresent()) {
            Donhang donhang = optionalOrder.get();
            // Xóa tất cả chi tiết đơn hàng liên quan
            chitietdonhangRepository.deleteByMadh(donhang.getMadh());
            // Xóa đơn hàng
            donhangRepository.delete(donhang);
        } else {
            throw new RuntimeException("Đơn hàng với ID: " + id + " không tồn tại");
        }
    }

    // Trong DonhangService
    public Page<Donhang> findAllPaged(Pageable pageable) {
        return donhangRepository.findAll(pageable);
    }
    // Lấy chi tiết đơn hàng theo mã đơn hàng (madh)
    public List<ChitietDonhang> getChitietDonhangByDonhangId(Integer madh) {
        return chitietdonhangRepository.findByMadh(madh);
    }

    public List<ChitietDonhang> getOrderDetailsByOrderId(int madh) {
        return chitietdonhangRepository.findByMadh(madh); // Chi tiết đơn hàng theo mã đơn hàng
    }

}
