package com.example.Test.controller;

import com.example.Test.service.DashboarhService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/dashboarh")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"})
public class DashboarhController {
    @Autowired
    private DashboarhService dashboardService;

    // Get total number of orders
    @GetMapping("/tongdonhang")
    public long getTotalOrders() {
        return dashboardService.getTotalOrders();
    }

    // Get total revenue
    @GetMapping("/tongdoanhthu")
    public long getTotalRevenue() {
        return dashboardService.getTotalRevenue();
    }
    // Get total number of products
    @GetMapping("/tongsanpham")
    public long getTotalProducts() {
        return dashboardService.getTotalProducts();
    }

    // Get total number of customers
    @GetMapping("/tongkhachhang")
    public long getTotalCustomers() {
        return dashboardService.getTotalCustomers();
    }
    // Get total number of customers within a date range
    @GetMapping("/thongketheongay")
    public long getCustomersByDateRange(@RequestParam("startDate") Date startDate, @RequestParam("endDate") Date endDate) {
        return dashboardService.getCustomersByDateRange(startDate, endDate);
    }
}
