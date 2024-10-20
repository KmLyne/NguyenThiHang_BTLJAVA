package com.example.Test.controller;

import com.example.Test.model.ChitietDonhang;
import com.example.Test.model.Donhang;

import com.example.Test.model.OrderHistoryResponse;
import com.example.Test.repository.ChitietDonhangRepository;
import com.example.Test.service.ChitietDonhangService;
import com.example.Test.service.DonhangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/donhang")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"})
public class DonhangController {

    @Autowired
    private DonhangService donhangService;

    @Autowired
    private ChitietDonhangRepository chiTietDonHangRepository;

    @Autowired
    private ChitietDonhangService chitietDonhangService;

    // Lấy danh sách tất cả đơn hàng
    @GetMapping("/getAll")
    public List<Donhang> getAll() {
        return donhangService.findAll();
    }

    // Lấy đơn hàng theo ID
    @GetMapping("/getById/{id}")
    public ResponseEntity<Donhang> getDonhangById(@PathVariable Integer id) {
        Optional<Donhang> donhang = donhangService.findById(id);
        return donhang.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Tạo đơn hàng mới
    @PostMapping("/create")
    public Donhang createDonhang(@RequestBody Donhang donhang) {
        return donhangService.save(donhang);
    }

    // Cập nhật đơn hàng theo ID
    @PutMapping("/update/{id}")
    public ResponseEntity<Donhang> updateDonhang(@PathVariable Integer id, @RequestBody Donhang donhang) {
        if (donhangService.findById(id).isPresent()) {
            donhang.setMadh(id); // Set mã đơn hàng (ID) từ request path
            return ResponseEntity.ok(donhangService.save(donhang));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Xóa đơn hàng theo ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteByMadh(@PathVariable Integer id) {
        try {
            donhangService.deleteDonhang(id);
            return ResponseEntity.ok().body(Collections.singletonMap("message", "Đơn hàng và chi tiết đơn hàng đã được xóa"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Collections.singletonMap("error", "Có lỗi xảy ra khi xóa đơn hàng"));
        }
    }

    // Phân trang đơn hàng
    @GetMapping("/getPaged")
    public Page<Donhang> getPagedDonhangs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return donhangService.findAllPaged(pageable);
    }
    //Lay chi tiet đon hang bang ma don hang
    @GetMapping("/chitiet/{madh}")
    public ResponseEntity<List<ChitietDonhang>> getOrderDetails(@PathVariable Integer madh) {
        List<ChitietDonhang> details = donhangService.getChitietDonhangByDonhangId(madh);
        return new ResponseEntity<>(details, HttpStatus.OK);
    }

    // Lấy chi tiết đơn hàng theo mã đơn hàng
    @GetMapping("/details/{madh}")
    public List<ChitietDonhang> getOrderDetails(@PathVariable int madh) {
        return donhangService.getOrderDetailsByOrderId(madh);
    }

}

