import { Routes } from '@angular/router';
import { LoginComponent } from './Admin/login/login.component';
import { SanphamComponent } from './Admin/sanpham/sanpham.component';
import { TaikhoanComponent } from './Admin/taikhoan/taikhoan.component';
import { ThuonghieuComponent } from './Admin/thuonghieu/thuonghieu.component';
import { XuatxuComponent } from './Admin/xuatxu/xuatxu.component';
import { DonhangComponent } from './Admin/donhang/donhang.component';
import { TrangchuComponent } from './User/trangchu/trangchu.component';
import { SanphamusComponent } from './User/sanphamus/sanphamus.component';
import { TintucComponent } from './User/tintuc/tintuc.component';
import { GioithieuComponent } from './User/gioithieu/gioithieu.component';
import { SanphamFormComponent } from './Admin/sanpham/sanpham-form/sanpham-form.component';
import { ThuonghieuFormComponent } from './Admin/thuonghieu/thuonghieu-form/thuonghieu-form.component';
import { XuatxuFormComponent } from './Admin/xuatxu/xuatxu-form/xuatxu-form.component';
import { DonhangFormComponent } from './Admin/donhang/donhang-form/donhang-form.component';
import { TaikhoanFormComponent } from './Admin/taikhoan/taikhoan-form/taikhoan-form.component';
import { ChitietComponent } from './User/chitiet/chitiet.component';
import { GiohangComponent } from './User/giohang/giohang.component';
import { ThanhtoanComponent } from './User/thanhtoan/thanhtoan.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { ChitietdonhangComponent } from './Admin/chitietdonhang/chitietdonhang.component';
import { DangkyComponent } from './Admin/dangky/dangky.component';
import { NgModule } from '@angular/core';
import { LichsuComponent } from './User/lichsu/lichsu.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'sanpham', component: SanphamComponent },
  { path: 'taikhoan', component: TaikhoanComponent },
  { path: 'thuonghieu', component: ThuonghieuComponent },
  { path: 'xuatxu', component: XuatxuComponent },
  { path: 'donhang', component: DonhangComponent },
  { path: 'login', component: LoginComponent },
  { path: 'trangchu', component: TrangchuComponent },
  { path: 'sanphamus', component: SanphamusComponent },
  { path: 'tintuc', component: TintucComponent },
  { path: 'gioithieu', component: GioithieuComponent },
  { path: 'sanpham/new', component: SanphamFormComponent },
  { path: 'sanpham/edit/:id', component: SanphamFormComponent },
  { path: 'thuonghieu/edit/:id', component: ThuonghieuFormComponent },
  { path: 'thuonghieu/new', component: ThuonghieuFormComponent },
  { path: 'xuatxu/edit/:id', component: XuatxuFormComponent },
  { path: 'xuatxu/new', component: XuatxuFormComponent },
  { path: 'taikhoan/edit/:id', component: TaikhoanFormComponent },
  { path: 'taikhoan/new', component: TaikhoanFormComponent},
  { path: 'donhang/edit/:id', component: DonhangFormComponent},
  { path: 'donhang/chitiet/:id', component: ChitietdonhangComponent},
  { path: 'chitiet/:id', component: ChitietComponent},
  { path: 'giohang', component: GiohangComponent},
  { path: 'thanhtoan', component: ThanhtoanComponent},
  { path: 'dashboarh', component: DashboardComponent},
  { path: 'dangky', component: DangkyComponent },
  { path: 'lichsu', component: LichsuComponent }
];
