import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TaikhoanService } from '../taikhoan.service';
import { Taikhoan } from '../taikhoan.model';
import { Role } from '../../role/role.model';
import { RoleService } from '../../role/role.service';

@Component({
  selector: 'app-taikhoan-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, RouterLink],
  templateUrl: './taikhoan-form.component.html',
  styleUrl: './taikhoan-form.component.css'
})
export class TaikhoanFormComponent {
  taikhoan: Taikhoan = {
    user_id: 0,
    tennd: '',
    email: '',
    matkhau: '',
    role_id: 0
  };
  message: string = '';

  vaitro: Role[] = [];

  constructor(
    private taikhoanService: TaikhoanService,
    private roleService: RoleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Load roles (admin, user, etc.)
    this.roleService.getRoles().subscribe(
      (vaitro) => {
        this.vaitro = vaitro;
      },
      (error) => console.error('Error loading roles:', error)
    );

    // Check if editing an existing account
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.taikhoanService.getTaikhoanById(Number(id)).subscribe(
        (taikhoan) => {
          this.taikhoan = taikhoan;
        },
        (error) => console.error('Error loading account:', error)
      );
    }
  }

  saveTaikhoan(): void {
    if (this.taikhoan.user_id) {
      this.taikhoanService.updateTaikhoan(this.taikhoan.user_id, this.taikhoan).subscribe(() => {
        this.message = 'Tài khoản được cập nhật thành công!';
        alert(this.message);
        this.router.navigate(['/taikhoan']);
      });
    } else {
      this.taikhoanService.createTaikhoan(this.taikhoan).subscribe(() => {
        this.message = 'Tài khoản được thêm thành công!';
        alert(this.message);
        this.router.navigate(['/taikhoan']);
      });
    }
  }
}
