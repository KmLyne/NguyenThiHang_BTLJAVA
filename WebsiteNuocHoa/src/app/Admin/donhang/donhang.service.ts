import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Donhang } from './donhang.model'; // Adjust the path as necessary
import { Page } from './page.model'; 
import { Chitietdonhang } from '../chitietdonhang/chitietdonhang.model';

@Injectable({
  providedIn: 'root',
})
export class DonhangService {
  private apiUrl = 'http://localhost:8080/donhang'; // Update the API URL for products

  constructor(private http: HttpClient) {}

  getDonhangs(): Observable<Donhang[]> {
    return this.http.get<Donhang[]>(`${this.apiUrl}/getAll`);
  }

  getDonhangById(id: number): Observable<Donhang> {
    return this.http.get<Donhang>(`${this.apiUrl}/getById/${id}`);
  }

  createDonhang(donhang: Donhang): Observable<Donhang> {
    return this.http.post<Donhang>(`${this.apiUrl}/create`, donhang);
  }

  updateDonhang(id: number, donhang: Donhang): Observable<Donhang> {
    return this.http.put<Donhang>(`${this.apiUrl}/update/${id}`, donhang);
  }

  deleteDonhang(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  getDonhangsPaged(page: number, size: number): Observable<Page<Donhang>> {
    return this.http.get<Page<Donhang>>(`${this.apiUrl}/getPaged?page=${page}&size=${size}`);
  }
  
  getChitietDonhangByDonhangId(madh: string | null): Observable<any> {
    return this.http.get(`${this.apiUrl}/chitiet/${madh}`);
  }
  // Method to get orders by user ID
  getOrdersByUserId(userId: number): Observable<Donhang[]> {
    return this.http.get<Donhang[]>(`${this.apiUrl}/user/${userId}`);
  }
  getChiTietDonHangByDonHangId(madh: number): Observable<Chitietdonhang[]> {
    return this.http.get<Chitietdonhang[]>(`${this.apiUrl}/${madh}`);
  }
}
