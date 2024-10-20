package com.example.Test.repository;

import com.example.Test.model.Taikhoan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TaikhoanRepository extends JpaRepository<Taikhoan, Integer> {
    Optional<Taikhoan> findByEmail(String email);
}
