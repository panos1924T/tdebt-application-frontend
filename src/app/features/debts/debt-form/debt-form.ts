import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DebtService } from '../debt.service';

@Component({
  selector: 'app-debt-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCardModule],
  templateUrl: './debt-form.html',
  styleUrl: './debt-form.css'
})
export class DebtFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private debtService = inject(DebtService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  debtUuid = signal<string | null>(null);
  isEditMode = signal(false);
  errorMessage = signal('');

  form = this.fb.nonNullable.group({
    debtorName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    debtType: ['I_OWE' as 'I_OWE' | 'OWED_TO_ME', Validators.required],
    description: ['']
  });

  ngOnInit() {
    const uuid = this.route.snapshot.paramMap.get('uuid');

    if (uuid) {
      this.debtUuid.set(uuid);
      this.isEditMode.set(true);
      this.form.get('debtType')?.disable();
      this.loadDebt(uuid);
    }
  }

  private loadDebt(uuid: string) {
    this.debtService.getByUuid(uuid).subscribe(debt => {
      this.form.patchValue({
        debtorName: debt.debtorName,
        debtType: debt.debtType,
        description: debt.description ?? ''
      });
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.errorMessage.set('');
    const raw = this.form.getRawValue();

    const request = this.isEditMode()
      ? this.debtService.update(this.debtUuid()!, { debtorName: raw.debtorName, description: raw.description || null })
      : this.debtService.create({ debtorName: raw.debtorName, debtType: raw.debtType, description: raw.description || null });

    request.subscribe({
      next: (debt) => this.router.navigate(['/debts', debt.uuid]),
      error: (err) => {
        this.errorMessage.set(err.status === 400 ? 'Invalid data, please check the form' : 'Something went wrong, please try again');
      }
    });
  }
}