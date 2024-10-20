package com.example.Test.repository;

import com.example.Test.model.Donhang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DonhangRepository extends JpaRepository<Donhang, Integer> {
}
