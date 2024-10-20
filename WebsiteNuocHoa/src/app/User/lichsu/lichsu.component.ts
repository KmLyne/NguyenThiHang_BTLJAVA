import { Component, OnInit } from '@angular/core';
import { DonhangService } from '../../Admin/donhang/donhang.service';
import { Donhang } from '../../Admin/donhang/donhang.model'; // Adjust the path for the Order model
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaikhoanService } from '../../Admin/taikhoan/taikhoan.service';
import { ChitietdonhangService } from '../../Admin/chitietdonhang/chitietdonhang.service';
import { Chitietdonhang } from '../../Admin/chitietdonhang/chitietdonhang.model';

@Component({
  selector: 'app-lichsu',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, RouterLink],
  templateUrl: './lichsu.component.html',
  styleUrls: ['./lichsu.component.css']
})
export class LichsuComponent implements OnInit {
  chitietdonhangs: Chitietdonhang[] = [];
  userId: number | null = null;  // Initially set to null, will be populated later.

  constructor(
    private donhangService: DonhangService,
    private taikhoanService: TaikhoanService,
    private chitietdonhangService: ChitietdonhangService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.setUserId();
    if (this.userId) {
      this.loadOrderDetails();
    } else {
      console.error("User ID is not set, redirecting to login.");
      this.router.navigate(['/login']);  // Redirect to login if userId is missing
    }
  }

  // Function to set the userId from sessionStorage
  setUserId() {
    const userIdFromSession = sessionStorage.getItem('taikhoanId');  // Ensure this matches the key from login
    if (userIdFromSession) {
      this.userId = parseInt(userIdFromSession, 10);  // Convert to number
      console.log("User ID retrieved from sessionStorage:", this.userId);
    } else {
      this.userId = null;  // If no user ID found, set to null
    }
  }

  // Function to load order details
  loadOrderDetails() {
    if (this.userId !== null) {
      this.chitietdonhangService.getOrderDetail(this.userId).subscribe(
        (data) => {
          if (data && data.length > 0) {
            this.chitietdonhangs = data;
          } else {
            console.log('No order details found.');
            // Optionally show a message to the user
          }
        },
        (error) => {
          console.error('Error fetching order details', error);
          // Optionally show an error message to the user
        }
      );
    }
  }
  
}
