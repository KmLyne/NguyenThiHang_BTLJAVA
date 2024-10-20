import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Xuatxu } from './xuatxu.model'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root',
})
export class XuatxuService {
  private apiUrl = 'http://localhost:8080/xuatxu'; // Update the API URL for products

  constructor(private http: HttpClient) {}

  getXuatxus(): Observable<Xuatxu[]> {
    return this.http.get<Xuatxu[]>(`${this.apiUrl}/getAll`);
  }

  getXuatxuById(id: number): Observable<Xuatxu> {
    return this.http.get<Xuatxu>(`${this.apiUrl}/getById/${id}`);
  }

  createXuatxu(xuatxu: Xuatxu): Observable<Xuatxu> {
    return this.http.post<Xuatxu>(`${this.apiUrl}/create`, xuatxu);
  }

  updateXuatxu(id: number, xuatxu: Xuatxu): Observable<Xuatxu> {
    return this.http.put<Xuatxu>(`${this.apiUrl}/update/${id}`, xuatxu);
  }

  deleteXuatxu(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
