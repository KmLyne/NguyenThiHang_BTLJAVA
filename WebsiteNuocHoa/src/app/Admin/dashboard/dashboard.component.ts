import { Component, OnInit } from '@angular/core';
import { DashboarhService } from './dashboarh.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductService } from '../sanpham/sanpham.service';
import { Sanpham } from '../sanpham/sanpham.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  totalProducts: number = 0;
  totalOrders: number = 0;
  totalCustomers: number = 0;
  totalRevenue: number = 0;

  sanphams: Sanpham[] = [];

  customersByDateRange: number = 0;

  constructor(
    private dashboarhService: DashboarhService,
    private sanphamService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Load statistics when component is initialized
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.dashboarhService.getTotalProducts().subscribe(data => {
      this.totalProducts = data;
    });
    this.dashboarhService.getTotalOrders().subscribe(data => {
      this.totalOrders = data;
    });
    this.dashboarhService.getTotalCustomers().subscribe(data => {
      this.totalCustomers = data;
    });
    this.dashboarhService.getTotalRevenue().subscribe(data => {
      this.totalRevenue = data;
    });
  }
  
}
