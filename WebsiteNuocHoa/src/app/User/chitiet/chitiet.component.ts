import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { ProductService } from '../../Admin/sanpham/sanpham.service';
import { Sanpham } from '../../Admin/sanpham/sanpham.model';
import { Router, RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../giohang/cart.service';
import { Thuonghieu } from '../../Admin/thuonghieu/thuonghieu.model';
import { Xuatxu } from '../../Admin/xuatxu/xuatxu.model';
import { ThuonghieuService } from '../../Admin/thuonghieu/thuonghieu.service';
import { XuatxuService } from '../../Admin/xuatxu/xuatxu.service';

@Component({
  selector: 'app-chitiet',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, RouterLink], // Add CommonModule here to use ngIf
  templateUrl: './chitiet.component.html',
  styleUrls: ['./chitiet.component.css']
})
export class ChitietComponent implements OnInit {
  sanpham!: Sanpham;
  thuonghieu!: Thuonghieu;  // Declare thuonghieu
  xuatxu!: Xuatxu;     
  cartItemCount: number = 0;
  selectedQuantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private thuonghieuService: ThuonghieuService, 
    private xuatxuService: XuatxuService,
    private cartService: CartService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadSanpham();
    this.cartService.getCartItems().subscribe(items => {
      this.cartItemCount = items.length; // Cập nhật số lượng sản phẩm trong giỏ hàng
      console.log('Cart Item Count:', this.cartItemCount); // Thêm dòng này
    });
  }

  loadSanpham(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getSanphamById(id).subscribe(
      (data: Sanpham) => {
        console.log('Loading product with ID:', id);
        console.log('Product details:', data);
        this.sanpham = data;
  
        // Fetch thuonghieu and xuatxu based on math and maxx
        this.loadThuonghieu(data.math);
        this.loadXuatxu(data.maxx);
      },
      (error) => {
        console.error('Error loading product details', error);
      }
    );
  }
  
  loadThuonghieu(math: number): void {
    this.thuonghieuService.getThuonghieuById(math).subscribe(
      (thuonghieu: Thuonghieu) => {
        this.thuonghieu = thuonghieu;
        console.log('Loaded brand:', thuonghieu);
      },
      (error) => {
        console.error('Error loading brand details', error);
      }
    );
  }
  
  loadXuatxu(maxx: number): void {
    this.xuatxuService.getXuatxuById(maxx).subscribe(
      (xuatxu: Xuatxu) => {
        this.xuatxu = xuatxu;
        console.log('Loaded origin:', xuatxu);
      },
      (error) => {
        console.error('Error loading origin details', error);
      }
    );
  }
  //xu li gio hang
  addToCart(sanpham: Sanpham) {
    this.cartService.addToCart(sanpham, this.selectedQuantity); // Pass selectedQuantity
    alert(`Sản phẩm đã được thêm vào giỏ hàng với số lượng: ${this.selectedQuantity}`);
  }  
}
