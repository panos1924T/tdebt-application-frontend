import { Component, OnInit, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { DebtService } from '../debt.service';
import { Debt } from '../../../core/models/debt-interface';

@Component({
  selector: 'app-debt-detail',
  standalone: true,
  imports: [DecimalPipe, RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
  templateUrl: './debt-detail.html',
  styleUrl: './debt-detail.css'})

export class DebtDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private debtService = inject(DebtService);

  debt = signal<Debt | null>(null);
  errorMessage = signal('');

  ngOnInit() {
    const uuid = this.route.snapshot.paramMap.get('uuid')!;
    this.debtService.getByUuid(uuid).subscribe({
      next: (debt) => this.debt.set(debt),
      error: () => this.errorMessage.set('Debt not found')
    });
  }

  onToggleStatus() {
    const current = this.debt();
    if (!current) return;

    this.debtService.toggleStatus(current.uuid).subscribe(updated => this.debt.set(updated));
  }

  onDelete() {
  const current = this.debt();
  if (!current) return;

  if (!confirm(`Delete debt "${current.debtorName}"? This cannot be undone.`)) return;

  this.debtService.delete(current.uuid).subscribe({
    next: () => this.router.navigate(['/debts']),
    error: (err) => {
      this.errorMessage.set(
        err.status === 409 ? 'Cannot delete a debt that has transactions, archieve instead' : 'Something went wrong'
      );
    }
  });
}
}