import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChitietdonhangService } from './chitietdonhang.service';
import { DonhangService } from '../donhang/donhang.service';
import { Donhang } from '../donhang/donhang.model';
import { Chitietdonhang } from './chitietdonhang.model';
import { ProductService } from '../sanpham/sanpham.service';

@Component({
  selector: 'app-chitietdonhang',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './chitietdonhang.component.html',
  styleUrls: ['./chitietdonhang.component.css']
})
export class ChitietdonhangComponent implements OnInit {
  donhangList: Donhang[] = [];
  selectedChiTietDonHangList: Chitietdonhang[] = []; // Use the updated interface
  selectedOrderId: number | null = null;

  constructor(
    private chitietService: ChitietdonhangService,
    private donhangService: DonhangService,
    private sanPhamService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadDonhangList();
  }

  loadDonhangList(): void {
    this.donhangService.getDonhangs().subscribe((data) => {
      this.donhangList = data;
    });
  }

  // Lấy chi tiết đơn hàng dựa trên mã đơn hàng (madh)
  getChiTietDonHangByDonHangId(madh: number): void {
    this.selectedOrderId = madh;
    this.chitietService.getChiTietDonHangByDonHangId(madh).subscribe((data) => {
      this.selectedChiTietDonHangList = data;

      // Sau khi lấy được danh sách chi tiết đơn hàng, lấy tên sản phẩm cho từng chi tiết
      this.selectedChiTietDonHangList.forEach((chitiet) => {
        this.getProductDetails(chitiet.masp);
      });
    });
  }
  // Lấy thông tin sản phẩm dựa trên masp và gán tên sản phẩm vào chi tiết đơn hàng
  getProductDetails(masp: number): void {
    this.sanPhamService.getSanphamById(masp).subscribe((product) => {
      const chitiet = this.selectedChiTietDonHangList.find(item => item.masp === masp);
      if (chitiet) {
        chitiet.tensp = product.tensp; // Gán tên sản phẩm vào chi tiết đơn hàng
        chitiet.gia = product.gia; // Có thể gán thêm giá nếu cần
        chitiet.anhsp = product.anhsp; // Có thể gán thêm ảnh sản phẩm
      }
    });
  }
}
