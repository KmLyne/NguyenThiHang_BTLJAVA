package com.example.Test.repository;

import com.example.Test.model.ChitietDonhang;
import com.example.Test.model.OrderHistoryResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChitietDonhangRepository extends JpaRepository<ChitietDonhang, Integer> {

    // Method to delete order details by order ID (madh)
    void deleteByMadh(Integer madh);

    List<ChitietDonhang> findByMadh(Integer madh);
    // Custom query to find order details by user_id
    List<ChitietDonhang> findByUserId(Integer userId);
}
