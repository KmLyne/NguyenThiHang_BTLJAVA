package com.example.Test.model;

import jakarta.persistence.*;

@Entity
@Table(name = "donhang")

public class Donhang {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer madh;
    private String ngaydathang;
    private String tenkh;
    private String diachi;
    private String sdt;
    private String email;
    private String ghichu;
    private String trangthai;
    private Integer tongtien;

    //Contructors
    public Donhang() {}

    public Donhang(Integer madh, String ngaydathang, String tenkh, String diachi, String sdt, String email, String ghichu, String trangthai, Integer tongtien) {
        this.madh = madh;
        this.ngaydathang = ngaydathang;
        this.tenkh = tenkh;
        this.diachi = diachi;
        this.sdt = sdt;
        this.email = email;
        this.ghichu = ghichu;
        this.trangthai = trangthai;
        this.tongtien = tongtien;
    }

    public Integer getMadh() {
        return madh;
    }

    public void setMadh(Integer madh) {
        this.madh = madh;
    }

    public String getNgaydathang() {
        return ngaydathang;
    }

    public void setNgaydathang(String ngaydathang) {
        this.ngaydathang = ngaydathang;
    }

    public String getTenkh() {
        return tenkh;
    }

    public void setTenkh(String tenkh) {
        this.tenkh = tenkh;
    }

    public String getDiachi() {
        return diachi;
    }

    public void setDiachi(String diachi) {
        this.diachi = diachi;
    }

    public String getSdt() {
        return sdt;
    }

    public void setSdt(String sdt) {
        this.sdt = sdt;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getGhichu() {
        return ghichu;
    }

    public void setGhichu(String ghichu) {
        this.ghichu = ghichu;
    }

    public String getTrangthai() {
        return trangthai;
    }

    public void setTrangthai(String trangthai) {
        this.trangthai = trangthai;
    }

    public Integer getTongtien() {
        return tongtien;
    }

    public void setTongtien(Integer tongtien) {
        this.tongtien = tongtien;
    }
}
