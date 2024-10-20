import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ThuonghieuService } from './thuonghieu.service';
import { Thuonghieu } from './thuonghieu.model';

@Component({
  selector: 'app-thuonghieu',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, RouterLink],
  templateUrl: './thuonghieu.component.html',
  styleUrl: './thuonghieu.component.css'
})
export class ThuonghieuComponent {
  thuonghieus: Thuonghieu[] = []; // Array to hold the products
  searchQuery: string = ''; // Search query for filtering products

  constructor(
    private thuonghieuService: ThuonghieuService, // Inject the SanphamService
    private router: Router
  ) {}

  ngOnInit(): void {
    this.thuonghieuService.getThuonghieus().subscribe((data) => {
      this.thuonghieus = data; // Load products from the service
    });
  }
  editThuonghieu(id: number): void {
    this.router.navigate(['/thuonghieu/edit', id]); // Navigate to edit page for the product
  }
  deleteThuonghieu(id: number): void {
    const confirmed = window.confirm('Bạn có chắc chắn muốn xóa thương hiệu này không?');
    if (confirmed) {
      this.thuonghieuService.deleteThuonghieu(id).subscribe(() => {
        this.thuonghieus = this.thuonghieus.filter((p) => p.math !== id); // Remove deleted product from the list
        alert("Thương hiệu được xóa thành công"); // Show success message
      });
    }
  }
  get filteredThuonghieus(): Thuonghieu[] {
    if (!this.searchQuery) {
      return this.thuonghieus; // Return all products if no search query
    }
    return this.thuonghieus.filter(thuonghieu =>
      thuonghieu.tenth.toLowerCase().includes(this.searchQuery.toLowerCase()) 
    );
  }
}
