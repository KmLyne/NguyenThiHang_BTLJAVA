import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DashboarhService {

  private apiUrl = 'http://localhost:8080/dashboarh'; // Change this to your backend URL

  constructor(private http: HttpClient) { }

  // Get total number of products
  getTotalProducts(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/tongsanpham`);
  }

  // Get total number of orders
  getTotalOrders(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/tongdonhang`);
  }

  // Get total revenue
  getTotalRevenue(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/tongdoanhthu`);
  }

  // Get total number of customers
  getTotalCustomers(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/tongkhachhang`);
  }
  // Get total number of customers within a date range
  getCustomersByDateRange(startDate: Date, endDate: Date): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}//thongketheongay?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
  }
}
