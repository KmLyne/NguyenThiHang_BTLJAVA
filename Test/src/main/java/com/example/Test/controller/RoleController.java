package com.example.Test.controller;

import com.example.Test.model.Role;
import com.example.Test.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/role")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"})
public class RoleController {
    @Autowired
    private RoleService roleService; // Đổi tên biến cho nhất quán

    // Lấy danh sách tất cả sản phẩm
    @GetMapping("/getAll")
    public List<Role> getAll() {
        return roleService.findAll();
    }
}
