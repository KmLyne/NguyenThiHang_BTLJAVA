package com.example.Test.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class DashboarhService {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Tong don hang
    public long getTotalOrders() {
        String sql = "SELECT COUNT(*) FROM DonHang";
        return jdbcTemplate.queryForObject(sql, Long.class);
    }

    // Tong doanh thu
    public long getTotalRevenue() {
        String sql = "SELECT SUM(TongTien) FROM DonHang";
        return jdbcTemplate.queryForObject(sql, Long.class);
    }
    // Tong san pham
    public long getTotalProducts() {
        String sql = "SELECT COUNT(*) FROM SanPham";
        return jdbcTemplate.queryForObject(sql, Long.class);
    }

    // Tong so khach hang
    public long getTotalCustomers() {
        String sql = "SELECT COUNT(DISTINCT Email) FROM Taikhoan";
        return jdbcTemplate.queryForObject(sql, Long.class);
    }
    // Get total customers registered within a specific date range
    public long getCustomersByDateRange(Date startDate, Date endDate) {
        String sql = "SELECT COUNT(DISTINCT Email) FROM Taikhoan WHERE registration_date BETWEEN ? AND ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{startDate, endDate}, Long.class);
    }
}
