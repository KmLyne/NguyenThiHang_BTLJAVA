package com.example.Test.model;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "sanpham") // Đảm bảo tên bảng đúng với CSDL
public class Sanpham {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer masp;
    private String tensp;
    private String anhsp;
    private Integer soluong;
    private Integer gia;
    private String mota;
    private Integer math; // Mã thương hiệu
    private Integer maxx; // Mã xuất xứ

    // Constructors
    public Sanpham() {}

    public Sanpham(String tensp, String anhsp, Integer soluong, Integer gia, String mota, Integer math, Integer maxx) {
        this.tensp = tensp;
        this.anhsp = anhsp;
        this.soluong = soluong;
        this.gia = gia;
        this.mota = mota;
        this.math = math;
        this.maxx = maxx;
    }

    public Integer getMasp() {
        return masp;
    }

    public void setMasp(Integer masp) {
        this.masp = masp;
    }

    public String getTensp() {
        return tensp;
    }

    public void setTensp(String tensp) {
        this.tensp = tensp;
    }

    public String getAnhsp() {
        return anhsp;
    }

    public void setAnhsp(String anhsp) {
        this.anhsp = anhsp;
    }

    public Integer getSoluong() {
        return soluong;
    }

    public void setSoluong(Integer soluong) {
        this.soluong = soluong;
    }

    public Integer getGia() {
        return gia;
    }

    public void setGia(Integer gia) {
        this.gia = gia;
    }

    public String getMota() {
        return mota;
    }

    public void setMota(String mota) {
        this.mota = mota;
    }

    public Integer getMath() {
        return math;
    }

    public void setMath(Integer math) {
        this.math = math;
    }

    public Integer getMaxx() {
        return maxx;
    }

    public void setMaxx(Integer maxx) {
        this.maxx = maxx;
    }
}