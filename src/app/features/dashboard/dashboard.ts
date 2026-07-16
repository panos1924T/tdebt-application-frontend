import { Component, inject, OnInit, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { DebtListComponent } from '../debts/debt-list/debt-list';
import { TransactionListComponent } from '../transactions/transaction-list/transaction-list';
import { DebtService } from '../debts/debt.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DecimalPipe, DebtListComponent, TransactionListComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  private debtService = inject(DebtService);

  totalIOwe = signal(0);
  totalOwedToMe = signal(0);

  ngOnInit() {
    this.loadTotal('I_OWE', this.totalIOwe);
    this.loadTotal('OWED_TO_ME', this.totalOwedToMe);
  }

    loadTotal(type: 'I_OWE' | 'OWED_TO_ME', target: ReturnType<typeof
    signal<number>>) {
      this.debtService.getPaginated({ type, status: 'OPEN' }, 0, 1000).subscribe(page => {
        const sum = page.content.reduce((acc, debt) => acc + debt.balance, 0);
        target.set(sum);
    });
}
}