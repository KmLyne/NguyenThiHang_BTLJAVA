import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Taikhoan } from './taikhoan.model'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root',
})
export class TaikhoanService {
  private apiUrl = 'http://localhost:8080/taikhoan';
  private currentUser: Taikhoan | null = null; // Update the API URL for products

  constructor(private http: HttpClient) {}

  getTaikhoans(): Observable<Taikhoan[]> {
    return this.http.get<Taikhoan[]>(`${this.apiUrl}/getAll`);
  }

  getTaikhoanById(id: number): Observable<Taikhoan> {
    return this.http.get<Taikhoan>(`${this.apiUrl}/getById/${id}`);
  }

  createTaikhoan(taikhoan: Taikhoan): Observable<Taikhoan> {
    return this.http.post<Taikhoan>(`${this.apiUrl}/create`, taikhoan);
  }

  updateTaikhoan(id: number, taikhoan: Taikhoan): Observable<Taikhoan> {
    return this.http.put<Taikhoan>(`${this.apiUrl}/update/${id}`, taikhoan);
  }

  deleteTaikhoan(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  login(taikhoan: { email: string, matkhau: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, taikhoan);
  }
  
  // Set the current user
  setCurrentUser(user: Taikhoan): void {
    this.currentUser = user;
    // Optionally, save the user to localStorage for persistence across sessions
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  // Phương thức lấy người dùng hiện tại từ localStorage
  getCurrentUser(): Taikhoan | null {
    // Kiểm tra xem ứng dụng có đang chạy trong môi trường trình duyệt không
    if (typeof window !== 'undefined' && window.localStorage) {
      const user = localStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;  // Trả về người dùng từ localStorage, nếu có
    }
    return null;  // Nếu không có localStorage, trả về null
  }

  // Optional: Method to clear the user session on logout
  clearCurrentUser(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }
}
