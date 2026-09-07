import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { EMPTY } from 'rxjs';

import { DashboardComponent } from './dashboard';
import { DebtService } from '../debts/debt.service';
import { TransactionService } from '../transactions/transaction.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  const debtServiceMock = {
    getPaginated: () => EMPTY,
  };

  const transactionServiceMock = {
    getAllForUser: () => EMPTY,
    getForDebt: () => EMPTY,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        provideRouter([]),
        provideNativeDateAdapter(),
        { provide: DebtService, useValue: debtServiceMock },
        { provide: TransactionService, useValue: transactionServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});