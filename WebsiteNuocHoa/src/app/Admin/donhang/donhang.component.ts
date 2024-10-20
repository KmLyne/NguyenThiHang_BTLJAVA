import { Component } from '@angular/core';
import { Donhang } from './donhang.model';
import { DonhangService } from './donhang.service';
import { RouterModule } from '@angular/router';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chitietdonhang } from '../chitietdonhang/chitietdonhang.model';
import { ChitietdonhangService } from '../chitietdonhang/chitietdonhang.service';
import { Page } from './page.model';

@Component({
  selector: 'app-donhang',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, RouterLink],
  templateUrl: './donhang.component.html',
  styleUrl: './donhang.component.css'
})
export class DonhangComponent {
  donhangs: Donhang[] = [];
  chitietdonhangs: Chitietdonhang[] = [];
  searchQuery: string = '';
  currentPage: number = 0;
  totalPages: number = 0;
  pageSize: number = 5; // Items per page

  constructor(
    private donhangService: DonhangService,
    private chitietdonhangService: ChitietdonhangService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPages(); // Initial load of paginated data
  }

  // Load the paginated data
  loadPages(page: number = 0): void {
    this.donhangService.getDonhangsPaged(page, this.pageSize).subscribe(
      (data: Page<Donhang>) => {
        this.donhangs = data.content;
        this.currentPage = data.number;
        this.totalPages = data.totalPages;
      },
      (error) => {
        console.error('Error loading orders', error);
      }
    );
  }

  // Handle page change
  onPageChange(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.loadPages(page);
    }
  }

  // Navigate to order details
  getChiTietDonHangByDonHangId(madh: number): void {
    this.router.navigate(['/donhang/chitiet', madh]);
  }

  // Navigate to edit order
  editDonhang(id: number): void {
    this.router.navigate(['/donhang/edit', id]);
  }

  // Phương thức xóa
  // Phương thức xóa đơn hàng với kiểm tra trạng thái
deleteDonhang(id: number) {
  this.donhangService.getDonhangById(id).subscribe(
    (donhang) => {
      // Chỉ cho phép xóa nếu trạng thái là "Đã hủy" hoặc "Đã giao"
      if (donhang.trangthai == 'Đã hủy' || donhang.trangthai == 'Đã giao') {
        if (confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
          this.donhangService.deleteDonhang(id).subscribe(
            (response) => {
              console.log('Đơn hàng đã được xóa', response);
              this.loadPages();
            },
            (error) => {
              console.error('Lỗi khi xóa đơn hàng', error);
            }
          );
        }
      } else {
        alert('Chỉ có thể xóa đơn hàng đã hủy hoặc đã giao.');
      }
    },
    (error) => {
      console.error('Lỗi khi lấy thông tin đơn hàng', error);
    }
  );
}


  // Filter orders based on search query
  get filteredDonhangs(): Donhang[] {
    if (!this.searchQuery) {
      return this.donhangs; // Return all orders if no search query
    }
    return this.donhangs.filter(donhang =>
      donhang.tenkh.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      donhang.ngaydathang.toString().includes(this.searchQuery) ||
      donhang.sdt.toString().includes(this.searchQuery)
    );
  }
}
