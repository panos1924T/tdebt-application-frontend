import { Component, OnInit, inject, signal, input, computed } from '@angular/core';
import { DecimalPipe, DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { TransactionService } from '../transaction.service';
import { Transaction, TransactionFilters } from '../../../core/models/transaction-interface';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [
    DecimalPipe, DatePipe, ReactiveFormsModule, MatTableModule, MatPaginatorModule,
    MatChipsModule, MatFormFieldModule, MatSelectModule, MatDatepickerModule, MatInputModule, RouterLink
  ],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.css'
})
export class TransactionListComponent implements OnInit {
  debtUuid = input<string | null>(null);
  debtType = input<'I_OWE' | 'OWED_TO_ME' | null>(null);

  private fb = inject(FormBuilder);
  private transactionService = inject(TransactionService);
  private toDateString(date: Date | string | null): string | undefined {
  if (!date) return undefined;
  if (typeof date === 'string') return date;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
  }

  displayedColumns = computed(() =>
    this.debtUuid()
      ? ['date', 'action', 'amount', 'note', 'status']
      : ['date', 'debtorName', 'action', 'amount', 'note', 'status']
  );
  transactions = signal<Transaction[]>([]);
  totalElements = signal(0);
  pageIndex = signal(0);
  pageSize = signal(10);

  filterForm = this.fb.group({
    action: [''],
    fromDate: [''],
    toDate: ['']
  });

  ngOnInit() {
    this.loadTransactions();

    this.filterForm.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => {
        this.pageIndex.set(0);
        this.loadTransactions();
      });
  }

  loadTransactions() {
    const raw = this.filterForm.getRawValue();

    const filters: TransactionFilters = {
      action: (raw.action || undefined) as 'INCREASE' | 'DECREASE' | undefined,
      fromDate: this.toDateString(raw.fromDate),
      toDate: this.toDateString(raw.toDate),
      debtType: this.debtType() || undefined
    };

    const debtUuid = this.debtUuid();
    const request = debtUuid
      ? this.transactionService.getForDebt(debtUuid, filters, this.pageIndex(), this.pageSize())
      : this.transactionService.getAllForUser(filters, this.pageIndex(), this.pageSize());

    request.subscribe(page => {
      this.transactions.set(page.content);
      this.totalElements.set(page.totalElements);
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.loadTransactions();
  }
}