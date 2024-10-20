import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../sanpham.service';
import { Sanpham } from '../sanpham.model';
import { Thuonghieu } from '../../thuonghieu/thuonghieu.model';
import { Xuatxu } from '../../xuatxu/xuatxu.model';
import { ThuonghieuService } from '../../thuonghieu/thuonghieu.service';
import { XuatxuService } from '../../xuatxu/xuatxu.service';

@Component({
  selector: 'app-sanpham-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, RouterLink],
  templateUrl: './sanpham-form.component.html',
  styleUrls: ['./sanpham-form.component.css'] // Corrected property name
})
export class SanphamFormComponent implements OnInit {
  sanpham: Sanpham = {
    masp: 0,
    tensp: '',
    anhsp: '',
    soluong: 0,
    gia: 0,
    mota: '',
    math: 0,
    maxx: 0
  };
  message: string = '';
  thuonghieus: Thuonghieu[] = [];
  xuatxus: Xuatxu[] = [];
  selectedFile: File | null = null;
  imageError: string = '';
  imagePreview: string | null = null;
  isFormSubmitted: boolean = false;

  constructor(
    private productService: ProductService,
    private thuonghieuService: ThuonghieuService,
    private xuatxuService: XuatxuService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getSanphamById(Number(id)).subscribe(
        (sanpham) => {
          this.sanpham = sanpham;
        },
        (error) => console.error('Error fetching product:', error)
      );
    }
    this.loadXuatxu();
    this.loadThuonghieu();
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const selectedFile = target.files[0];

      // Validate file size
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (selectedFile.size > maxSize) {
        this.imageError = 'Kích thước hình ảnh không được vượt quá 5MB.';
        this.selectedFile = null;
        this.imagePreview = ''; // Reset preview
        return;
      }

      // If everything is valid, assign the values
      this.selectedFile = selectedFile; // Assign selected file
      this.sanpham.anhsp = this.selectedFile.name; // Store only the file name
      this.imagePreview = URL.createObjectURL(this.selectedFile); // Preview the image
      this.imageError = ''; // Clear any error messages
    }
  }

  loadThuonghieu(): void {
    this.thuonghieuService.getThuonghieus().subscribe(
      (data) => {
        this.thuonghieus = data;
      },
      (error) => {
        console.error('Lỗi khi tải thương hiệu:', error);
      }
    );
  }

  getThuonghieuName(math: number): string {
    const th = this.thuonghieus.find((r) => r.math === math);
    return th ? th.tenth : '';
  }

  loadXuatxu(): void {
    this.xuatxuService.getXuatxus().subscribe(
      (data) => {
        this.xuatxus = data;
      },
      (error) => {
        console.error('Lỗi khi tải xuất xứ:', error);
      }
    );
  }

  getXuatxuName(maxx: number): string {
    const xx = this.xuatxus.find((r) => r.maxx === maxx);
    return xx ? xx.tenxx : '';
  }

  saveSanpham(): void {
    this.isFormSubmitted = true;

    // Validate required fields
    if (!this.sanpham.tensp || this.sanpham.tensp.trim() === '') {
      this.message = 'Vui lòng nhập tên sản phẩm.';
      alert(this.message);
      return;
    }

    if (!this.sanpham.anhsp || this.sanpham.anhsp.trim() === '') {
      this.imageError = 'Vui lòng nhập tên hình ảnh.';
      return;
    }

    if (this.sanpham.masp) {
      this.productService.updateSanpham(this.sanpham.masp, this.sanpham).subscribe(
        () => {
          this.message = 'Sản phẩm được cập nhật thành công!';
          alert(this.message);
          this.router.navigate(['/sanpham']);
        },
        (error) => {
          console.error('Error updating product:', error);
        }
      );
    } else {
      this.productService.createSanpham(this.sanpham).subscribe(
        () => {
          this.message = 'Sản phẩm được thêm thành công!';
          alert(this.message);
          this.router.navigate(['/sanpham']);
        },
        (error) => {
          console.error('Error creating product:', error);
        }
      );
    }
  }
}
