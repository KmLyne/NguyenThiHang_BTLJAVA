import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chitietdonhang } from './chitietdonhang.model'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root',
})
export class ChitietdonhangService {
  private apiUrl = 'http://localhost:8080/chitietdonhang'; // Update the API URL for products

  constructor(private http: HttpClient) {}

  getChitietDonhangs(): Observable<Chitietdonhang[]> {
    return this.http.get<Chitietdonhang[]>(`${this.apiUrl}/getAll`);
  }

  getChitietDonhangById(id: number): Observable<Chitietdonhang> {
    return this.http.get<Chitietdonhang>(`${this.apiUrl}/getById/${id}`);
  }

  createChitietDonhang(chitietdonhang: Chitietdonhang): Observable<Chitietdonhang> {
    return this.http.post<Chitietdonhang>(`${this.apiUrl}/create`, chitietdonhang);
  }

  updateChitietDonhang(id: number, chitietdonhang: Chitietdonhang): Observable<Chitietdonhang> {
    return this.http.put<Chitietdonhang>(`${this.apiUrl}/update/${id}`, chitietdonhang);
  }

  deleteChitietDonhang(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
  getOrderDetails(madh: number): Observable<Chitietdonhang[]> {
    return this.http.get<Chitietdonhang[]>(`${this.apiUrl}/chitiet/${madh}`);
  }
  // Fetch order details based on order ID (madh)
  getChitietdonhangByOrderId(madh: number): Observable<Chitietdonhang[]> {
    return this.http.get<Chitietdonhang[]>(`${this.apiUrl}/order/${madh}`);
  }
  getChiTietDonHangByDonHangId(madh: number): Observable<Chitietdonhang[]> {
    return this.http.get<Chitietdonhang[]>(`${this.apiUrl}/${madh}`);
  }
  // New method to get details by product ID
  getChiTietDonHangByProductId(masp: number): Observable<Chitietdonhang[]> {
    return this.http.get<Chitietdonhang[]>(`${this.apiUrl}/product/${masp}`);
  }
  getOrderDetail(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/findByUserId/${userId}`);
  }
  getOrderChitet(madh: number): Observable<Chitietdonhang[]> {
    return this.http.get<Chitietdonhang[]>(`${this.apiUrl}/chitietdonhang/${madh}`);
  }
  // Cancel order by order ID (madh)
  cancelOrder(madh: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/cancelOrder/${madh}`, {});
  }
}
