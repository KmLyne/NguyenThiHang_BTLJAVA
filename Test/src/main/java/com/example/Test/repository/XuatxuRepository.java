package com.example.Test.repository;

import com.example.Test.model.Xuatxu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface XuatxuRepository extends JpaRepository<Xuatxu, Integer> {
}
