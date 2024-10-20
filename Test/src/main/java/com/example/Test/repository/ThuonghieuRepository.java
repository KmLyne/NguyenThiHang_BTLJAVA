package com.example.Test.repository;

import com.example.Test.model.Thuonghieu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThuonghieuRepository extends JpaRepository<Thuonghieu, Integer> {
}

