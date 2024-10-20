package com.example.Test.controller;

import com.example.Test.model.Xuatxu;
import com.example.Test.service.XuatxuService; // Import your service
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/xuatxu")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"})
public class XuatxuController {

    @Autowired
    private XuatxuService xuatxuService;

    // Get all origins
    @GetMapping("/getAll")
    public List<Xuatxu> getAll() {
        return xuatxuService.findAll();
    }

    // Get an origin by ID
    @GetMapping("/getById/{id}")
    public ResponseEntity<Xuatxu> getXuatxuById(@PathVariable Integer id) {
        Optional<Xuatxu> xuatxu = xuatxuService.findById(id);
        return xuatxu.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new origin
    @PostMapping("/create")
    public ResponseEntity<Xuatxu> createXuatxu(@RequestBody Xuatxu xuatxu) {
        Xuatxu createdXuatxu = xuatxuService.save(xuatxu);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdXuatxu);
    }

    // Update an origin by ID
    @PutMapping("/update/{id}")
    public ResponseEntity<Xuatxu> updateXuatxu(@PathVariable Integer id, @RequestBody Xuatxu xuatxu) {
        if (xuatxuService.findById(id).isPresent()) {
            xuatxu.setMaxx(id); // Set the ID for the updated object
            return ResponseEntity.ok(xuatxuService.save(xuatxu));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete an origin by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteXuatxu(@PathVariable Integer id) {
        if (xuatxuService.findById(id).isPresent()) {
            xuatxuService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
