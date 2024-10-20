package com.example.Test.controller;

import com.example.Test.model.ChitietDonhang;
import com.example.Test.service.ChitietDonhangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/chitietdonhang")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"})
public class ChitietDonhangController {

    @Autowired
    private ChitietDonhangService chitietdonhangService;

    // Lấy danh sách tất cả chi tiết đơn hàng
    @GetMapping("/getAll")
    public List<ChitietDonhang> getAll() {
        return chitietdonhangService.findAll();
    }

    // Tạo chi tiết đơn hàng mới
    @PostMapping("/create")
    public ChitietDonhang createChitietDonhang(@RequestBody ChitietDonhang chitietdonhang) {
        return chitietdonhangService.save(chitietdonhang);
    }

    @GetMapping("/{madh}")
    public ResponseEntity<List<ChitietDonhang>> getChiTietDonHang(@PathVariable Integer madh) {
        List<ChitietDonhang> chiTietDonHangList = chitietdonhangService.getChiTietDonHangByDonHangId(madh);
        return new ResponseEntity<>(chiTietDonHangList, HttpStatus.OK);
    }
    @GetMapping("/findByUserId/{userId}")
    public List<ChitietDonhang> getOrderDetail(@PathVariable Integer userId) {
        return chitietdonhangService.findByUserId(userId);
    }
}
