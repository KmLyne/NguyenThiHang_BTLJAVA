import { Component } from '@angular/core';
import { TaikhoanService } from '../taikhoan/taikhoan.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Taikhoan } from '../taikhoan/taikhoan.model';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  matkhau: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private taikhoanService: TaikhoanService, private router: Router) {}

  onSubmit(): void {
    this.isLoading = true; // Show loading spinner
    this.errorMessage = ''; // Clear any previous error messages

    // Pass email and matkhau as an object
    this.taikhoanService.login({ email: this.email, matkhau: this.matkhau }).subscribe({
      next: (taikhoan: Taikhoan) => {
        if (taikhoan) {
          this.handleLoginSuccess(taikhoan);
        } else {
          this.handleLoginFailure('Đăng nhập không thành công. Vui lòng kiểm tra thông tin và thử lại.');
        }
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false; // Hide loading spinner
        this.handleLoginError(error);
      },
    });
  }

  // Handle successful login
  private handleLoginSuccess(taikhoan: Taikhoan): void {
    alert('Đăng nhập thành công!');
    this.taikhoanService.setCurrentUser(taikhoan);

    // Save user ID into sessionStorage
    sessionStorage.setItem('taikhoanId', taikhoan.user_id.toString());

    // Check role_id and redirect accordingly
    if (taikhoan.role_id === 1) { // Admin
      this.router.navigate(['/dashboarh']);
    } else if (taikhoan.role_id === 2) { // User
      this.router.navigate(['/trangchu']);
    } else {
      this.handleLoginFailure('Vai trò không hợp lệ. Vui lòng kiểm tra thông tin.');
    }
  }

  // Handle failed login due to incorrect credentials
  private handleLoginFailure(message: string): void {
    this.isLoading = false; // Hide loading spinner
    console.error(message);
    alert(message);
  }

  // Handle error response from the server
  private handleLoginError(error: HttpErrorResponse): void {
    if (error.status === 401) {
      alert('Sai mật khẩu!');
    } else if (error.status === 404) {
      alert('Tài khoản không tồn tại!');
    } else {
      console.error('Lỗi đăng nhập:', error);
      alert('Đã xảy ra lỗi. Vui lòng thử lại.');
    }
  }
}
