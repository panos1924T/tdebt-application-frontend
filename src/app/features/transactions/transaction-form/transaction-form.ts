import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  providers: [],
  imports: [
    ReactiveFormsModule, RouterLink, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatDatepickerModule, MatButtonModule, MatCardModule
  ],
  templateUrl: './transaction-form.html',
  styleUrl: './transaction-form.css'
})
export class TransactionFormComponent {
  private fb = inject(FormBuilder);
  private transactionService = inject(TransactionService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  debtUuid = this.route.snapshot.paramMap.get('debtUuid')!;
  errorMessage = '';

  form = this.fb.nonNullable.group({
    date: [new Date(), Validators.required],
    amount: [0, [Validators.required, Validators.min(0.01)]],
    action: ['INCREASE' as 'INCREASE' | 'DECREASE', Validators.required],
    note: ['']
  });

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.errorMessage = '';
    const raw = this.form.getRawValue();

    this.transactionService.create(this.debtUuid, {
      date: raw.date.toISOString().split('T')[0],
      amount: raw.amount,
      action: raw.action,
      note: raw.note || null
    }).subscribe({
      next: () => this.router.navigate(['/debts', this.debtUuid]),
      error: (err) => {
        this.errorMessage = err.error?.message || 'Something went wrong, please try again';
      }
    });
  }
}