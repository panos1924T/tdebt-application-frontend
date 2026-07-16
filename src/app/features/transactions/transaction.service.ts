import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Transaction, TransactionInsert, TransactionUpdate, TransactionFilters } from '../../core/models/transaction-interface';
import { Page } from '../../core/models/pagination-interface';

const API_URL = `${environment.apiUrl}`;

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private http = inject(HttpClient);

  getAllForUser(filters: TransactionFilters, page: number, size: number): Observable<Page<Transaction>> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort', 'date,desc');

    if (filters.action) params = params.set('action', filters.action);
    if (filters.fromDate) params = params.set('fromDate', filters.fromDate);
    if (filters.toDate) params = params.set('toDate', filters.toDate);
    if (filters.debtType) params = params.set('debtType', filters.debtType);

    return this.http.get<Page<Transaction>>(`${API_URL}/transactions`, { params });
  }

  getForDebt(debtUuid: string, filters: TransactionFilters, page: number, size: number): Observable<Page<Transaction>> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort', 'date,desc');

    if (filters.action) params = params.set('action', filters.action);
    if (filters.fromDate) params = params.set('fromDate', filters.fromDate);
    if (filters.toDate) params = params.set('toDate', filters.toDate);

    return this.http.get<Page<Transaction>>(`${API_URL}/debts/${debtUuid}/transactions`, { params });
  }

  create(debtUuid: string, data: TransactionInsert): Observable<Transaction> {
    return this.http.post<Transaction>(`${API_URL}/debts/${debtUuid}/transactions`, data);
  }

  update(debtUuid: string, transUuid: string, data: TransactionUpdate): Observable<Transaction> {
    return this.http.put<Transaction>(`${API_URL}/debts/${debtUuid}/transactions/${transUuid}`, data);
  }

  getByUuid(transUuid: string): Observable<Transaction> {
    return this.http.get<Transaction>(`${API_URL}/transactions/${transUuid}`);
  }
}