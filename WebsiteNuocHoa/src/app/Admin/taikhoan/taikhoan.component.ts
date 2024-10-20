import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TaikhoanService } from './taikhoan.service';
import { Taikhoan } from './taikhoan.model';
import { Role } from '../role/role.model';
import { RoleService } from '../role/role.service';
import { error } from 'node:console';

@Component({
  selector: 'app-taikhoan',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, RouterLink],
  templateUrl: './taikhoan.component.html',
  styleUrl: './taikhoan.component.css'
})
export class TaikhoanComponent {
  taikhoans: Taikhoan[] = []; // Array to hold the accounts
  searchQuery: string = ''; // Search query for filtering accounts
  selectedTaikhoanId: number | null = null; // Holds the ID of the account to be deleted

  vaitro: Role[] = [];

  constructor(
    private taikhoanService: TaikhoanService,
    private roleService: RoleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taikhoanService.getTaikhoans().subscribe((data) => {
      this.taikhoans = data; // Load accounts from the service
    });
    this.loadRole();
  }

  loadRole(){
    this.roleService.getRoles().subscribe(data => {
      this.vaitro = data;
    }, error => {
      console.log('Lỗi khi tải vai trò', error);
    });
  }
  getRoleName(role_id: number): string {
    const role = this.vaitro.find(r => r.role_id === role_id);
    return role ? role.role_name : '';
  }
  

  setSelectedTaikhoan(id: number): void {
    this.selectedTaikhoanId = id; // Set the selected account ID
  }

  confirmDelete(): void {
    if (this.selectedTaikhoanId !== null) {
      this.taikhoanService.deleteTaikhoan(this.selectedTaikhoanId).subscribe(() => {
        this.taikhoans = this.taikhoans.filter((p) => p.user_id !== this.selectedTaikhoanId); // Remove deleted account from the list
        alert("Tài khoản được xóa thành công!"); // Show success message
      });
      this.selectedTaikhoanId = null; // Reset the selected account ID
    }
  }

  editTaikhoan(id: number): void {
    this.router.navigate(['/taikhoan/edit', id]); // Navigate to edit page for the account
  }

  get filteredTaikhoans(): Taikhoan[] {
    if (!this.searchQuery) {
      return this.taikhoans; // Return all accounts if no search query
    }
    return this.taikhoans.filter(taikhoan =>
      taikhoan.tennd.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      taikhoan.matkhau.toString().includes(this.searchQuery) ||
      taikhoan.email.toString().includes(this.searchQuery)
    );
  }
}
