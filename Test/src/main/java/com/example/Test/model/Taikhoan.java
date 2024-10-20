package com.example.Test.model;

import jakarta.persistence.*;


@Entity
@Table (name = "taikhoan")
public class Taikhoan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer user_id;
    private String tennd;
    private String email;
    private String matkhau;
    private Integer role_id;

    //Contructors
    public Taikhoan() {}

    public Taikhoan(Integer user_id, String tennd, String email, String matkhau, Integer role_id) {
        this.user_id = user_id;
        this.tennd = tennd;
        this.email = email;
        this.matkhau = matkhau;
        this.role_id = role_id;
    }

    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }

    public String getTennd() {
        return tennd;
    }

    public void setTennd(String tennd) {
        this.tennd = tennd;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMatkhau() {
        return matkhau;
    }

    public void setMatkhau(String matkhau) {
        this.matkhau = matkhau;
    }

    public Integer getRole_id() {
        return role_id;
    }

    public void setRole_id(Integer role_id) {
        this.role_id = role_id;
    }
}
