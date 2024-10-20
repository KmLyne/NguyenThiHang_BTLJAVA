package com.example.Test.model;


import jakarta.persistence.*;

@Entity
@Table (name = "thuonghieu")
public class Thuonghieu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private  Integer math;

    private String tenth;

    //Contructors
    public Thuonghieu() {
    }
    public Thuonghieu(Integer math, String tenth) {
        this.math = math;
        this.tenth = tenth;
    }

    public Integer getMath() {
        return math;
    }

    public void setMath(Integer math) {
        this.math = math;
    }

    public String getTenth() {
        return tenth;
    }

    public void setTenth(String tenth) {
        this.tenth = tenth;
    }
}
