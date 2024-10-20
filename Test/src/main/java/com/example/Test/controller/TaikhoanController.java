package com.example.Test.controller;

import com.example.Test.model.Taikhoan;
import com.example.Test.service.TaikhoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Map;

@RestController
@RequestMapping("/taikhoan")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"})
public class TaikhoanController {

    @Autowired
    private TaikhoanService taikhoanService;

    // Lấy danh sách tất cả tài khoản
    @GetMapping("/getAll")
    public List<Taikhoan> getAll() {
        return taikhoanService.findAll();
    }

    // Lấy tài khoản theo ID
    @GetMapping("/getById/{id}")
    public ResponseEntity<Taikhoan> getTaikhoanById(@PathVariable Integer id) {
        Optional<Taikhoan> taikhoan = taikhoanService.findById(id);
        return taikhoan.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Tạo tài khoản mới
    @PostMapping("/create")
    public Taikhoan createTaikhoan(@RequestBody Taikhoan taikhoan) {
        return taikhoanService.save(taikhoan);
    }

    // Cập nhật tài khoản theo ID
    @PutMapping("/update/{id}")
    public ResponseEntity<Taikhoan> updateTaikhoan(@PathVariable Integer id, @RequestBody Taikhoan taikhoan) {
        if (taikhoanService.findById(id).isPresent()) {
            taikhoan.setUser_id(id);
            return ResponseEntity.ok(taikhoanService.save(taikhoan));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Xóa tài khoản theo ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteTaikhoan(@PathVariable Integer id) {
        if (taikhoanService.findById(id).isPresent()) {
            taikhoanService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    // API Đăng nhập
    @PostMapping("/login")
    public ResponseEntity<Taikhoan> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String matkhau = loginData.get("matkhau");

        Optional<Taikhoan> taiKhoanOptional = taikhoanService.findByEmail(email);
        if (taiKhoanOptional.isPresent()) {
            Taikhoan taikhoan = taiKhoanOptional.get();
            if (taikhoan.getMatkhau().equals(matkhau)) {
                return ResponseEntity.ok(taikhoan); // Return account info
            } else {
                return ResponseEntity.status(401).body(null); // Incorrect password
            }
        } else {    
            return ResponseEntity.status(404).body(null); // Account not found
        }
    }

}
