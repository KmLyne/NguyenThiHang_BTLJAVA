import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Thuonghieu } from '../../Admin/thuonghieu/thuonghieu.model';
import { Xuatxu } from '../../Admin/xuatxu/xuatxu.model';
import { ThuonghieuService } from '../../Admin/thuonghieu/thuonghieu.service';
import { XuatxuService } from '../../Admin/xuatxu/xuatxu.service';
import { Page } from '../../Admin/sanpham/page.model';
import { Sanpham } from '../../Admin/sanpham/sanpham.model';
import { ProductService } from '../../Admin/sanpham/sanpham.service';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../giohang/cart.service';

@Component({
  selector: 'app-sanphamus',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, RouterLink],
  templateUrl: './sanphamus.component.html',
  styleUrl: './sanphamus.component.css'
})
export class SanphamusComponent {

  sanphams: Sanpham[] = [];
  thuonghieus: Thuonghieu[] = [];
  xuatxus: Xuatxu[] = [];
  searchQuery: string = '';
  currentPage: number = 0;
  totalPages: number = 0;
  pageSize: number = 8;
  cartItemCount: number = 0;
  selectedQuantity: number = 1;
  selectedBrands: number[] = [];
  selectedOrigins: number[] = [];
  selectedPriceRange: string | null = null;


  constructor(
    private sanphamService: ProductService,
    private thuonghieuService: ThuonghieuService, 
    private xuatxuService: XuatxuService,
    private router: Router,
    private http: HttpClient,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    this.loadPages(); // Tải sản phẩm khi khởi động
    this.loadXuatxu(); // Tải xuất xứ
    this.loadThuonghieu(); // Tải thương hiệu
    this.cartService.getCartItems().subscribe(items => {
      this.cartItemCount = items.length; // Cập nhật số lượng sản phẩm trong giỏ hàng
      console.log('Cart Item Count:', this.cartItemCount); // Thêm dòng này
    });
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
    const confirmed = window.confirm('Are you sure you want to delete this product?');
    if (confirmed) {
      this.sanphamService.deleteSanpham(id).subscribe(() => {
        this.sanphams = this.sanphams.filter((p) => p.masp !== id);
        alert("Product deleted successfully!");
        // Reload the current page to refresh the data
        this.loadPages(this.currentPage);
      });
    }
  }

  //xu li gio hang
  addToCart(sanpham: Sanpham) {
    this.cartService.addToCart(sanpham, this.selectedQuantity); // Pass selectedQuantity
    alert(`Sản phẩm đã được thêm vào giỏ hàng với số lượng: ${this.selectedQuantity}`);
  }
  
  // Method to handle brand selection from checkboxes
  onBrandSelect(brandId: number, event: any): void {
    if (event.target.checked) {
      this.selectedBrands.push(brandId); // Add brand ID to the selected list
    } else {
      const index = this.selectedBrands.indexOf(brandId);
      if (index !== -1) {
        this.selectedBrands.splice(index, 1); // Remove brand ID from the list
      }
    }
  }
  onOriginSelect(originId: number, event: any): void {
    if (event.target.checked) {
      this.selectedOrigins.push(originId); // Add origin ID to the selected list
    } else {
      const index = this.selectedOrigins.indexOf(originId);
      if (index !== -1) {
        this.selectedOrigins.splice(index, 1); // Remove origin ID from the list
      }
    }
    this.filterProductsBySelectedBrandsAndOrigins();
  }
  
  filterProductsBySelectedBrandsAndOrigins(): void {
    // Call this method to filter products based on both selected brands and origins
    this.loadPages(); // Reload products with updated filters
  }
  filterByPriceRange(): void {
    this.loadPages(); // Tải lại sản phẩm sau khi thay đổi khoảng giá
  }
  
  get filteredSanphams(): Sanpham[] {
    if (this.selectedBrands.length === 0 && this.selectedOrigins.length === 0 && !this.selectedPriceRange) {
      return this.sanphams; // Hiển thị tất cả sản phẩm nếu không có thương hiệu, xuất xứ hoặc giá được chọn
    } else {
      return this.sanphams.filter(sanpham => {
        const matchesBrand = this.selectedBrands.length === 0 || this.selectedBrands.includes(sanpham.math);
        const matchesOrigin = this.selectedOrigins.length === 0 || this.selectedOrigins.includes(sanpham.maxx);
        const matchesPrice = this.isInPriceRange(sanpham.gia); // Sử dụng hàm isInPriceRange để kiểm tra giá
        return matchesBrand && matchesOrigin && matchesPrice;
      });
    }
  }
  
  // Phương thức kiểm tra xem giá có nằm trong khoảng giá đã chọn không
  isInPriceRange(price: number): boolean {
    if (!this.selectedPriceRange) {
      return true; // Nếu không có khoảng giá được chọn, bỏ qua kiểm tra giá
    }
    
    switch (this.selectedPriceRange) {
      case '0-100000':
        return price >= 0 && price <= 100000;
      case '100000-300000':
        return price > 100000 && price <= 300000;
      case '300000-500000':
        return price > 300000 && price <= 500000;
      case '500000+':
        return price > 500000;
      default:
        return true; // Mặc định nếu không có khoảng giá hợp lệ
    }
  }
}
