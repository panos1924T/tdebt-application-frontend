import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DecimalPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TransactionService } from '../transaction.service';
import { DebtService } from '../../debts/debt.service';
import { Transaction, TransactionAction } from '../../../core/models/transaction-interface';

@Component({
  selector: 'app-transaction-correction',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule, RouterLink, DecimalPipe, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatDatepickerModule, MatButtonModule, MatCardModule
  ],
  templateUrl: './transaction-correction.html',
  styleUrl: './transaction-correction.css'
})
export class TransactionCorrectionComponent implements OnInit {
  private fb = inject(FormBuilder);
  private transactionService = inject(TransactionService);
  private debtService = inject(DebtService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  debtUuid = this.route.snapshot.paramMap.get('debtUuid')!;
  transUuid = this.route.snapshot.paramMap.get('transUuid')!;

  original = signal<Transaction | null>(null);
  currentBalance = signal(0);
  errorMessage = signal('');

  // live values from the form, updated on every change, used to compute the preview
  formAction = signal<TransactionAction>('INCREASE');
  formAmount = signal(0);

  form = this.fb.nonNullable.group({
    date: [new Date(), Validators.required],
    amount: [0, [Validators.required, Validators.min(0.01)]],
    action: ['INCREASE' as TransactionAction, Validators.required],
    note: ['']
  });

  // the delta this correction would apply, matching the backend's calculation logic
  delta = computed(() => {
    const original = this.original();
    if (!original) return 0;

    const originalContribution = original.resultingAction === 'INCREASE' ? original.resultingAmount : -original.resultingAmount;
    const newContribution = this.formAction() === 'INCREASE' ? this.formAmount() : -this.formAmount();

    return newContribution - originalContribution;
  });

  resultingBalance = computed(() => this.currentBalance() + this.delta());

  ngOnInit() {
    this.transactionService.getByUuid(this.transUuid).subscribe(transaction => {
      this.original.set(transaction);
      this.form.patchValue({
        date: new Date(transaction.date),
        amount: transaction.resultingAmount,
        action: transaction.resultingAction,
        note: transaction.note ?? ''
      });
      this.formAction.set(transaction.resultingAction);
      this.formAmount.set(transaction.resultingAmount);
    });

    this.debtService.getByUuid(this.debtUuid).subscribe(debt => {
      this.currentBalance.set(debt.balance);
    });

    // keep the preview signals in sync with the form as the user types
    this.form.valueChanges.subscribe(value => {
      this.formAction.set(value.action ?? 'INCREASE');
      this.formAmount.set(value.amount ?? 0);
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.errorMessage.set('');
    const raw = this.form.getRawValue();

    this.transactionService.update(this.debtUuid, this.transUuid, {
      date: raw.date.toISOString().split('T')[0],
      amount: raw.amount,
      action: raw.action,
      note: raw.note || null
    }).subscribe({
      next: () => this.router.navigate(['/debts', this.debtUuid]),
      error: (err) => {
        this.errorMessage.set(err.error?.message || 'Something went wrong, please try again');
      }
    });
  }
}