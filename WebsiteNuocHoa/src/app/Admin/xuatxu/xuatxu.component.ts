import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { XuatxuService } from './xuatxu.service';
import { Xuatxu } from './xuatxu.model';



@Component({
  selector: 'app-xuatxu',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, RouterLink],
  templateUrl: './xuatxu.component.html',
  styleUrl: './xuatxu.component.css'
})
export class XuatxuComponent {

  xuatxus: Xuatxu[] = []; // Array to hold the products
  searchQuery: string = ''; // Search query for filtering products

  constructor(
    private xuatxuService: XuatxuService, // Inject the SanphamService
    private router: Router
  ) {}
  ngOnInit(): void {
    this.xuatxuService.getXuatxus().subscribe((data) => {
      this.xuatxus = data; // Load products from the service
    });
  }
  editXuatxu(id: number): void {
    this.router.navigate(['/xuatxu/edit', id]); // Navigate to edit page for the product
  }

  deleteXuatxu(id: number): void {
    const confirmed = window.confirm('Bạn có chắc chắc muốn xóa xuất xứ không?');
    if (confirmed) {
      this.xuatxuService.deleteXuatxu(id).subscribe(() => {
        this.xuatxus = this.xuatxus.filter((p) => p.maxx !== id); // Remove deleted product from the list
        alert("Xuất xứ được xóa thành công!"); // Show success message
      });
    }
  }
  get filteredXuatxus(): Xuatxu[] {
    if (!this.searchQuery) {
      return this.xuatxus; // Return all products if no search query
    }
    return this.xuatxus.filter(sanpham =>
      sanpham.tenxx.toLowerCase().includes(this.searchQuery.toLowerCase()) 
    );
  }
}
