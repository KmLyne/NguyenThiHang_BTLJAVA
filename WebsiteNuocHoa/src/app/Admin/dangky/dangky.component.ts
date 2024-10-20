import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Add ReactiveFormsModule here
import { Router, ActivatedRoute } from '@angular/router';
import { TaikhoanService } from '../taikhoan/taikhoan.service'; // Ensure correct path to service
import { Taikhoan } from '../taikhoan/taikhoan.model'; // Ensure correct path to model
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dangky',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule], // Include ReactiveFormsModule here
  templateUrl: './dangky.component.html',
  styleUrls: ['./dangky.component.css']
})
export class DangkyComponent implements OnInit {
  registerForm: FormGroup; // Form group for the registration form
  message: string = ''; // Variable to store error messages
  successMessage: string = ''; // Variable to store success messages

  constructor(
      private fb: FormBuilder,
      private taikhoanService: TaikhoanService,
      private router: Router,
      private route: ActivatedRoute
  ) {
      this.registerForm = this.fb.group({
          tennd: ['', Validators.required], // Add the 'tennd' field here
          email: ['', [Validators.required, Validators.email]],
          matkhau: ['', Validators.required],
          confirmPassword: ['', [Validators.required, this.passwordMatchValidator.bind(this)]],
      });
  }

  ngOnInit(): void {}

  // Validator to check if password and confirmPassword fields match
  passwordMatchValidator(control: any) {
      return control.value === this.registerForm?.get('matkhau')?.value ? null : { mismatch: true };
  }

  onSubmit(): void {
      if (this.registerForm.valid) {
          const newAccount: Taikhoan = {
              user_id: 0, // Assuming this is handled by the backend
              tennd: this.registerForm.value.tennd, // Add 'tennd' to the new account object
              email: this.registerForm.value.email,
              matkhau: this.registerForm.value.matkhau,
              role_id: 2, // Assuming '2' is the ID for the default role (User)
          };

          // Call the service to create a new account
          this.taikhoanService.createTaikhoan(newAccount).subscribe(
              (response) => {
                  console.log('Tài khoản đã được tạo thành công:', response);
                  window.alert('Tạo tài khoản thành công!');// Set success message
                  this.router.navigate(['/login']); // Redirect to the login page
              },
              (error) => {
                  console.error('Lỗi khi tạo tài khoản:', error);
                  // Check the server error status
                  if (error.status === 409) {
                      this.message = 'Tài khoản đã tồn tại!'; // Status 409: Conflict
                  } else if (error.status === 400) {
                      this.message = 'Thông tin không hợp lệ!'; // Status 400: Bad Request
                  } else {
                      this.message = 'Có lỗi xảy ra! Vui lòng thử lại sau.'; // Other errors
                  }
              }
          );
      } else {
          this.message = 'Vui lòng điền đầy đủ thông tin!';
      }
  }
}
