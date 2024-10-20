package com.example.Test.model;

import java.time.LocalDateTime;
import java.util.List;

public class OrderHistoryResponse {

    private Long maDH;
    private String tenSP;
    private double gia;
    private int soLuong;
    private String trangThai;
    private LocalDateTime ngayDatHang;

    // Constructors, getters, and setters
    public OrderHistoryResponse(Long maDH, String tenSP, double gia, int soLuong, String trangThai, LocalDateTime ngayDatHang) {
        this.maDH = maDH;
        this.tenSP = tenSP;
        this.gia = gia;
        this.soLuong = soLuong;
        this.trangThai = trangThai;
        this.ngayDatHang = ngayDatHang;
    }

    // Getters and setters
}

