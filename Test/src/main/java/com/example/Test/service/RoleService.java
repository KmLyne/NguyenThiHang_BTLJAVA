package com.example.Test.service;

import com.example.Test.model.Role;
import com.example.Test.model.Sanpham;
import com.example.Test.repository.RoleRepository;
import com.example.Test.repository.SanphamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    // Lấy danh sách tất cả sản phẩm
    public List<Role> findAll() {
        return roleRepository.findAll();
    }
}
