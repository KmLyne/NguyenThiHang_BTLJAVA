import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sanpham } from './sanpham.model';
import { Page } from './page.model'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/sanpham'; // Update the API URL for products

  constructor(private http: HttpClient) {}

  getSanphams(): Observable<Sanpham[]> {
    return this.http.get<Sanpham[]>(`${this.apiUrl}/getAll`);
  }

  getSanphamById(id: number): Observable<Sanpham> {
    return this.http.get<Sanpham>(`${this.apiUrl}/getById/${id}`);
  }

  createSanpham(sanpham: Sanpham): Observable<Sanpham> {
    return this.http.post<Sanpham>(`${this.apiUrl}/create`, sanpham);
  }

  updateSanpham(id: number, sanpham: Sanpham): Observable<Sanpham> {
    return this.http.put<Sanpham>(`${this.apiUrl}/update/${id}`, sanpham);
  }

  deleteSanpham(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
  getSanphamsPaged(page: number, size: number): Observable<Page<Sanpham>> {
    return this.http.get<Page<Sanpham>>(`${this.apiUrl}/getPaged?page=${page}&size=${size}`);
  }
  uploadImage(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/upload`, formData, {
        reportProgress: true,
        observe: 'events'
    });
  }
  getSanphamsByBrand(math: number): Observable<Sanpham[]> {
    return this.http.get<Sanpham[]>(`api/thuonghieu/${math}`); // Adjust the URL to your API
  }
  
}
