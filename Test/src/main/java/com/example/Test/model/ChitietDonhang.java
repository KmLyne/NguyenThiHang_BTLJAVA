package com.example.Test.model;

import jakarta.persistence.*;

@Entity
@Table(name = "chitietdonhang")
public class ChitietDonhang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer mact;
    private Integer madh;
    private Integer masp;

    @Column(name = "user_id")
    private Integer userId;
    private Integer tongtien;
    private Integer soluong;

    //Constructors

    public ChitietDonhang() {}

    public Integer getUser_id() {
        return userId;
    }

    public void setUser_id(Integer user_id) {
        this.userId = user_id;
    }

    public ChitietDonhang(Integer mact, Integer madh, Integer masp, Integer user_id, Integer tongtien, Integer soluong) {
        this.mact = mact;
        this.madh = madh;
        this.masp = masp;
        this.userId = user_id;
        this.tongtien = tongtien;
        this.soluong = soluong;
    }

    public Integer getMact() {
        return mact;
    }

    public void setMact(Integer mact) {
        this.mact = mact;
    }

    public Integer getMadh() {
        return madh;
    }

    public void setMadh(Integer madh) {
        this.madh = madh;
    }

    public Integer getMasp() {
        return masp;
    }

    public void setMasp(Integer masp) {
        this.masp = masp;
    }

    public Integer getTongtien() {
        return tongtien;
    }

    public void setTongtien(Integer tongtien) {
        this.tongtien = tongtien;
    }

    public Integer getSoluong() {
        return soluong;
    }

    public void setSoluong(Integer soluong) {
        this.soluong = soluong;
    }
}
