import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Debt, DebtInsert, DebtUpdate, DebtFilters } from '../../core/models/debt-interface';
import { Page } from '../../core/models/pagination-interface';

const API_URL = `${environment.apiUrl}/debts`;

@Injectable({ providedIn: 'root' })
export class DebtService {
  private http = inject(HttpClient);

  getPaginated(filters: DebtFilters, page: number, size: number): Observable<Page<Debt>> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort', 'debtorName,asc');

    if (filters.status) params = params.set('status', filters.status);
    if (filters.type) params = params.set('type', filters.type);
    if (filters.debtorName) params = params.set('debtorName', filters.debtorName);

    return this.http.get<Page<Debt>>(API_URL, { params });
  }

  getByUuid(uuid: string): Observable<Debt> {
    return this.http.get<Debt>(`${API_URL}/${uuid}`);
  }

  create(data: DebtInsert): Observable<Debt> {
    return this.http.post<Debt>(API_URL, data);
  }

  update(uuid: string, data: DebtUpdate): Observable<Debt> {
    return this.http.put<Debt>(`${API_URL}/${uuid}`, data);
  }

  delete(uuid: string): Observable<Debt> {
    return this.http.delete<Debt>(`${API_URL}/${uuid}`);
  }

  toggleStatus(uuid: string): Observable<Debt> {
    return this.http.patch<Debt>(`${API_URL}/${uuid}`, {});
  }
}