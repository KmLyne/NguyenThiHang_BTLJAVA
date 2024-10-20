import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../giohang/cart.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Sanpham } from '../../Admin/sanpham/sanpham.model';
import { ChitietdonhangService } from '../../Admin/chitietdonhang/chitietdonhang.service';
import { Chitietdonhang } from '../../Admin/chitietdonhang/chitietdonhang.model';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TaikhoanService } from '../../Admin/taikhoan/taikhoan.service';

interface OrderResponse {
  madh: number; // Adjust according to your API response
}

@Component({
  selector: 'app-thanhtoan',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, FormsModule, RouterLink],
  templateUrl: './thanhtoan.component.html',
  styleUrls: ['./thanhtoan.component.css']
})
export class ThanhtoanComponent {
  checkoutForm: FormGroup;
  cartItems: Sanpham[] = [];
  totalQuantity: number = 0;
  totalAmount: number = 0;
  trangthai: string = 'Chờ xử lý';

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private chitietdonhangService: ChitietdonhangService,
    private taikhoanService: TaikhoanService,
    private http: HttpClient,
    private router: Router
  ) {
    this.checkoutForm = this.fb.group({
      tenkh: ['', Validators.required],
      diachi: ['', Validators.required],
      sdt: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      email: ['', [Validators.required, Validators.email]],
      ghichu: [''],
    });
  }

  ngOnInit(): void {
    this.loadCartItems(); // Load cart items
  }

  loadCartItems(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items; // Get products in cart
      this.calculateTotal(); // Calculate total
    });
  }

  calculateTotal(): void {
    this.totalQuantity = this.cartItems.reduce((total, item) => total + item.soluong, 0);
    this.totalAmount = this.cartService.getTotalPrice(); // Use method from service
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      const totalAmount = this.cartService.getTotalPrice();
      const currentUser = this.taikhoanService.getCurrentUser(); // Get the current user
      const userId = currentUser ? currentUser.user_id : 0; // Assuming `id` is the property for user ID

      const order = {
        tenkh: this.checkoutForm.value.tenkh,
        diachi: this.checkoutForm.value.diachi,
        sdt: this.checkoutForm.value.sdt,
        email: this.checkoutForm.value.email,
        ghichu: this.checkoutForm.value.ghichu,
        tongtien: totalAmount,
        ngaydathang: new Date(),
        trangthai: this.trangthai,

        sanPhamList: this.cartItems.map(item => ({
          mact: 0, // Or any default value you want to use for the detail ID
          madh: 0,
          user_id: userId, // Set user ID
          masp: item.masp,
          soluong: item.soluong,
          tongtien: item.gia * item.soluong,
        })),
      };

      // Create the order first
      this.http.post<OrderResponse>('http://localhost:8080/donhang/create', order).subscribe(response => {
        console.log('Đơn hàng đã được đặt:', response);
        alert('Đơn hàng của bạn đã được đặt thành công!');

        const madh = response.madh; // Get the order ID
        this.saveChitietDonhang(order.sanPhamList, madh); // Save order details
        this.updateProductQuantities(order.sanPhamList); // Update product quantities in the cart
        this.cartService.clearCart(); // Clear the cart after successful order placement

        // Reset the form after successful order placement
        this.checkoutForm.reset();
        this.router.navigate(['/trangchu']); // Navigate to the order history
      }, error => {
        console.error('Lỗi khi đặt hàng:', error);
        alert('Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại.');
      });
    }
  }

  private updateProductQuantities(sanPhamList: any[]): void {
    sanPhamList.forEach(item => {
      const quantityToUpdate = item.soluong; // Quantity to subtract from the stock
      this.cartService.updateProductQuantity(item.masp, quantityToUpdate); // Update quantity in the cart
    });
  }

  private saveChitietDonhang(sanPhamList: any[], madh: number) {
    sanPhamList.forEach(item => {
      const chitiet: Chitietdonhang = {
        mact: 0, // You can assign this based on your backend logic
        madh: madh,
        masp: item.masp,
        user_id: item.user_id,
        soluong: item.soluong,
        tongtien: item.tongtien,
        tensp: item.tensp,
        anhsp: item.anhsp,
        gia:item.gia,
        trangthai:item.trangthai,
        ngaydathang: item.ngaydathang
      };
      this.chitietdonhangService.createChitietDonhang(chitiet).subscribe(response => {
        console.log('Chi tiết đơn hàng đã được lưu:', response);
      }, error => {
        console.error('Lỗi khi lưu chi tiết đơn hàng:', error);
      });
    });
  }
}
