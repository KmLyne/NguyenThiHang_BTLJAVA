import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Thuonghieu } from './thuonghieu.model'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root',
})
export class ThuonghieuService {
  private apiUrl = 'http://localhost:8080/thuonghieu'; // Update the API URL for products

  constructor(private http: HttpClient) {}

  getThuonghieus(): Observable<Thuonghieu[]> {
    return this.http.get<Thuonghieu[]>(`${this.apiUrl}/getAll`);
  }

  getThuonghieuById(id: number): Observable<Thuonghieu> {
    return this.http.get<Thuonghieu>(`${this.apiUrl}/getById/${id}`);
  }

  createThuonghieu(thuonghieu: Thuonghieu): Observable<Thuonghieu> {
    return this.http.post<Thuonghieu>(`${this.apiUrl}/create`, thuonghieu);
  }

  updateThuonghieu(id: number, thuonghieu: Thuonghieu): Observable<Thuonghieu> {
    return this.http.put<Thuonghieu>(`${this.apiUrl}/update/${id}`, thuonghieu);
  }

  deleteThuonghieu(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
