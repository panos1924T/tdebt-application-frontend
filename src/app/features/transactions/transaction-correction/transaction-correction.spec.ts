import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { EMPTY } from 'rxjs';

import { TransactionCorrectionComponent } from './transaction-correction';
import { TransactionService } from '../transaction.service';
import { DebtService } from '../../debts/debt.service';

describe('TransactionCorrectionComponent', () => {
  let component: TransactionCorrectionComponent;
  let fixture: ComponentFixture<TransactionCorrectionComponent>;

  const transactionServiceMock = {
    getByUuid: () => EMPTY,
  };

  const debtServiceMock = {
    getByUuid: () => EMPTY,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionCorrectionComponent],
      providers: [
        provideRouter([]),
        { provide: TransactionService, useValue: transactionServiceMock },
        { provide: DebtService, useValue: debtServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionCorrectionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});