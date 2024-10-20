import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Thuonghieu } from '../../Admin/thuonghieu/thuonghieu.model';
import { Xuatxu } from '../../Admin/xuatxu/xuatxu.model';
import { ThuonghieuService } from '../../Admin/thuonghieu/thuonghieu.service';
import { XuatxuService } from '../../Admin/xuatxu/xuatxu.service';
import { Sanpham } from '../../Admin/sanpham/sanpham.model';
import { ProductService } from '../../Admin/sanpham/sanpham.service';
import { CartService } from '../giohang/cart.service';
import { TaikhoanService } from '../../Admin/taikhoan/taikhoan.service';
import { Taikhoan } from '../../Admin/taikhoan/taikhoan.model';

@Component({
  selector: 'app-trangchu',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, RouterLink],
  templateUrl: './trangchu.component.html',
  styleUrl: './trangchu.component.css'
})
export class TrangchuComponent {
  sanphams: Sanpham[] = [];
  thuonghieus: Thuonghieu[] = [];
  xuatxus: Xuatxu[] = [];
  searchQuery: string = '';
  cartItemCount: number = 0;
  selectedQuantity: number = 1;
  currentUser: Taikhoan | null = null;
  
  constructor(
    private sanphamService: ProductService,
    private thuonghieuService: ThuonghieuService, 
    private xuatxuService: XuatxuService,
    private cartService: CartService,
    private taikhoanService: TaikhoanService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadXuatxu(); // Tải xuất xứ
    this.loadThuonghieu();
    this.loadSanpham();
    this.cartService.getCartItems().subscribe(items => {
      this.cartItemCount = items.length; // Cập nhật số lượng sản phẩm trong giỏ hàng
      console.log('Cart Item Count:', this.cartItemCount); // Thêm dòng này
    }); // Tải sản phẩm
    this.currentUser = this.taikhoanService.getCurrentUser(); //load tên người dùng 
  }
  // Phương thức đăng xuất
  logout(): void {
    this.taikhoanService.clearCurrentUser();  // Xóa thông tin người dùng trong service

    // Xóa thông tin khỏi sessionStorage và localStorage (nếu có)
    sessionStorage.removeItem('taikhoanId');
    localStorage.removeItem('currentUser');

    // Điều hướng về trang đăng nhập
    this.router.navigate(['/login']);
  }
  loadSanpham(): void {
    this.sanphamService.getSanphams().subscribe(data => {
      this.sanphams = data;
    }, error => {
      console.error('Error loading products', error);
    });
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
    const confirmed = window.confirm('Are you sure you want to delete this product?');
    if (confirmed) {
      this.sanphamService.deleteSanpham(id).subscribe(() => {
        this.sanphams = this.sanphams.filter((p) => p.masp !== id);
        alert("Product deleted successfully!");
        // Reload the current page to refresh the data
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
  //xu li gio hang
  addToCart(sanpham: Sanpham) {
    this.cartService.addToCart(sanpham, this.selectedQuantity); // Pass selectedQuantity
    alert(`Sản phẩm đã được thêm vào giỏ hàng với số lượng: ${this.selectedQuantity}`);
  }  
}
