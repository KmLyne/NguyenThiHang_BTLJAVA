import { Component, OnInit } from '@angular/core';
import { ProductService } from './sanpham.service';
import { Sanpham } from './sanpham.model';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Thuonghieu } from '../thuonghieu/thuonghieu.model';
import { Xuatxu } from '../xuatxu/xuatxu.model';
import { ThuonghieuService } from '../thuonghieu/thuonghieu.service';
import { XuatxuService } from '../xuatxu/xuatxu.service';
import { Page } from './page.model';

@Component({
  selector: 'app-sanpham',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, RouterLink],
  templateUrl: './sanpham.component.html',
  styleUrls: ['./sanpham.component.css'] // Sửa thành styleUrls
})
export class SanphamComponent implements OnInit {
  
  sanphams: Sanpham[] = [];
  thuonghieus: Thuonghieu[] = [];
  xuatxus: Xuatxu[] = [];
  searchQuery: string = '';
  currentPage: number = 0;
  totalPages: number = 0;
  pageSize: number = 5;

  constructor(
    private sanphamService: ProductService,
    private thuonghieuService: ThuonghieuService, 
    private xuatxuService: XuatxuService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPages(); // Tải sản phẩm khi khởi động
    this.loadXuatxu(); // Tải xuất xứ
    this.loadThuonghieu(); // Tải thương hiệu
  }

  loadPages(page: number = 0): void {
    this.sanphamService.getSanphamsPaged(page, this.pageSize).subscribe(
      (data: Page<Sanpham>) => {
        this.sanphams = data.content;
        this.currentPage = data.number;
        this.totalPages = data.totalPages;
      },
      (error) => {
        console.error('Error loading products', error);
      }
    );
  }

  onPageChange(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.loadPages(page);
    }
  }

  loadThuonghieu(): void {
    this.thuonghieuService.getThuonghieus().subscribe(data => {
      this.thuonghieus = data;
    }, error => {
      console.error('Error loading brands', error);
    });
  }

  getThuonghieuName(math: number): string {
    const th = this.thuonghieus.find(r => r.math === math);
    return th ? th.tenth : '';
  }

  loadXuatxu(): void {
    this.xuatxuService.getXuatxus().subscribe(data => {
      this.xuatxus = data;
    }, error => {
      console.error('Error loading origins', error);
    });
  }

  getXuatxuName(maxx: number): string {
    const xx = this.xuatxus.find(r => r.maxx === maxx);
    return xx ? xx.tenxx : '';
  }

  editSanpham(id: number): void {
    this.router.navigate(['/sanpham/edit', id]);
  }

  deleteSanpham(id: number): void {
    const confirmed = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm không?');
    if (confirmed) {
      this.sanphamService.deleteSanpham(id).subscribe(() => {
        this.sanphams = this.sanphams.filter((p) => p.masp !== id);
        alert("Sản phẩm được xóa thành công!");
        // Reload the current page to refresh the data
        this.loadPages(this.currentPage);
      });
    }
  }

  get filteredSanphams(): Sanpham[] {
    if (!this.searchQuery) {
      return this.sanphams;
    }
    return this.sanphams.filter(sanpham =>
      sanpham.tensp.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      sanpham.gia.toString().includes(this.searchQuery) ||
      sanpham.soluong.toString().includes(this.searchQuery)
    );
  }
}
