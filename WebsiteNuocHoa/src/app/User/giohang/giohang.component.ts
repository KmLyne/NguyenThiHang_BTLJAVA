import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { Sanpham } from '../../Admin/sanpham/sanpham.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-giohang',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, RouterLink],
  templateUrl: './giohang.component.html',
  styleUrls: ['./giohang.component.css'], // Sửa thành `styleUrls` thay vì `styleUrl`
})
export class GiohangComponent implements OnInit {
  cartItems: Sanpham[] = []; // Sử dụng kiểu dữ liệu phù hợp

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items; // Gán giá trị nhận được cho cartItems
      console.log('Giỏ hàng hiện tại:', this.cartItems); // Kiểm tra giỏ hàng
    });
  }
  

  loadCartItems(): void {
    // Đăng ký để nhận các cập nhật từ cartService
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items; // Gán giá trị nhận được cho cartItems
    });
  }
  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.gia * item.soluong), 0);
  }
  removeFromCart(masp: number): void {
    const confirmation = window.confirm('Bạn có muốn xóa sản phẩm này khỏi giỏ hàng không?'); // Confirmation dialog
    if (confirmation) {
      this.cartService.removeFromCart(masp); // Call the service to remove the product
      this.loadCartItems(); // Update the cart items
      alert('Sản phẩm đã được xóa khỏi giỏ hàng thành công!'); // Success message
    }
  }
  

  checkout(): void {
    // Lưu thông tin giỏ hàng vào local storage (hoặc bất kỳ phương thức nào bạn muốn)
    localStorage.setItem('checkoutItems', JSON.stringify(this.cartItems));
    
    // Chuyển hướng đến trang thanh toán
    this.router.navigate(['/thanhtoan']);
  }
  
}
