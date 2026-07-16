import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { DebtService } from '../debt.service';
import { Debt } from '../../../core/models/debt-interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-debt-list',
  standalone: true,
  imports: [
    ReactiveFormsModule, RouterLink, MatTableModule, MatPaginatorModule,
    MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, MatIconModule, DecimalPipe
  ],
  templateUrl: './debt-list.html',
  styleUrl: './debt-list.css'
})
export class DebtListComponent implements OnInit {
  private fb = inject(FormBuilder);
  private debtService = inject(DebtService);

  displayedColumns = ['debtorName', 'debtType', 'balance', 'debtStatus', 'actions'];
  debts = signal<Debt[]>([]);
  totalElements = signal(0);
  pageIndex = signal(0);
  pageSize = signal(10);

  filterForm = this.fb.group({
    debtorName: [''],
    type: [''],
    status: ['']
  });

  ngOnInit() {
    this.loadDebts();

    this.filterForm.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => {
        this.pageIndex.set(0);
        this.loadDebts();
      });
  }

  loadDebts() {
    const raw = this.filterForm.getRawValue();
    this.debtService
      .getPaginated(
        { debtorName: raw.debtorName || undefined, type: raw.type as any || undefined, status: raw.status as any || undefined },
        this.pageIndex(),
        this.pageSize()
      )
      .subscribe(page => {
        this.debts.set(page.content);
        this.totalElements.set(page.totalElements);
      });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.loadDebts();
  }

  onToggleStatus(debt: Debt) {
    this.debtService.toggleStatus(debt.uuid).subscribe(() => this.loadDebts());
  }
}