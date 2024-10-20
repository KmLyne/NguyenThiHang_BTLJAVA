package com.example.Test.controller;

import com.example.Test.model.Sanpham;
import com.example.Test.service.SanphamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/sanpham")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"})
public class SanphamController {

    @Value("${file.upload-dir}")
    private String uploadDir;
    @Autowired
    private SanphamService sanphamService; // Đổi tên biến cho nhất quán

    // Lấy danh sách tất cả sản phẩm
    @GetMapping("/getAll")
    public List<Sanpham> getAll() {
        return sanphamService.findAll();
    }

    // Lấy sản phẩm theo ID
    @GetMapping("/getById/{id}")
    public ResponseEntity<Sanpham> getSanphamById(@PathVariable Integer id) {
        Optional<Sanpham> sanpham = sanphamService.findById(id);
        return sanpham.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Tạo sản phẩm mới
    @PostMapping("/create")
    public Sanpham createSanpham(@RequestBody Sanpham sanpham) {
        return sanphamService.save(sanpham);
    }

    // Cập nhật sản phẩm theo ID
    @PutMapping("/update/{id}")
    public ResponseEntity<Sanpham> updateSanpham(@PathVariable Integer id, @RequestBody Sanpham sanpham) {
        if (sanphamService.findById(id).isPresent()) {
            sanpham.setMasp(id); // Sử dụng setMaSP thay vì setId
            return ResponseEntity.ok(sanphamService.save(sanpham));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Xóa sản phẩm theo ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteSanpham(@PathVariable Integer id) {
        if (sanphamService.findById(id).isPresent()) {
            sanphamService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    // Phân trang sản phẩm
    @GetMapping("/getPaged")
    public Page<Sanpham> getPagedProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return sanphamService.findAllPaged(pageable);
    }
    @GetMapping("/uploads/{filename:.+}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        try {
            Path filePath = Paths.get(uploadDir).resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            // Determine content type
            String contentType = Files.probeContentType(filePath);
            if (contentType == null) {
                contentType = "application/octet-stream";
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(resource);
        } catch (MalformedURLException e) {
            return ResponseEntity.status(500).build();
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

}
