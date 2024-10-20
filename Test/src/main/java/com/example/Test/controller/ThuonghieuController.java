package com.example.Test.controller;

import com.example.Test.model.Thuonghieu;
import com.example.Test.service.ThuonghieuService; // Import your service
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/thuonghieu")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"})
public class ThuonghieuController {

    @Autowired
    private ThuonghieuService thuonghieuService;

    // Get all brands
    @GetMapping("/getAll")
    public List<Thuonghieu> getAll() {
        return thuonghieuService.findAll();
    }

    // Get a brand by ID
    @GetMapping("/getById/{id}")
    public ResponseEntity<Thuonghieu> getThuonghieuById(@PathVariable Integer id) {
        Optional<Thuonghieu> thuonghieu = thuonghieuService.findById(id);
        return thuonghieu.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new brand
    @PostMapping("/create")
    public ResponseEntity<Thuonghieu> createThuonghieu(@RequestBody Thuonghieu thuonghieu) {
        Thuonghieu createdThuonghieu = thuonghieuService.save(thuonghieu);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdThuonghieu);
    }

    // Update a brand by ID
    @PutMapping("/update/{id}")
    public ResponseEntity<Thuonghieu> updateThuonghieu(@PathVariable Integer id, @RequestBody Thuonghieu thuonghieu) {
        if (thuonghieuService.findById(id).isPresent()) {
            thuonghieu.setMath(id); // Set the ID for the updated object
            return ResponseEntity.ok(thuonghieuService.save(thuonghieu));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a brand by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteThuonghieu(@PathVariable Integer id) {
        if (thuonghieuService.findById(id).isPresent()) {
            thuonghieuService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
