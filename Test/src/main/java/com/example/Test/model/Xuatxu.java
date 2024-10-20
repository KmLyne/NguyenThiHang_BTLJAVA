package com.example.Test.model;

import jakarta.persistence.*;

@Entity
@Table (name = "xuatxu")
public class Xuatxu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private  Integer maxx;

    private String tenxx;

    public Xuatxu() {
    }

    public Xuatxu(Integer maxx, String tenxx) {
        this.maxx = maxx;
        this.tenxx = tenxx;
    }
    //Contructors

    public Integer getMaxx() {
        return maxx;
    }

    public void setMaxx(Integer maxx) {
        this.maxx = maxx;
    }

    public String getTenxx() {
        return tenxx;
    }

    public void setTenxx(String tenxx) {
        this.tenxx = tenxx;
    }
}
