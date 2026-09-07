import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideRouter } from '@angular/router';
import { EMPTY } from 'rxjs';

import { TransactionListComponent } from './transaction-list';
import { TransactionService } from '../transaction.service';

describe('TransactionListComponent', () => {
  let component: TransactionListComponent;
  let fixture: ComponentFixture<TransactionListComponent>;

  const transactionServiceMock = {
    getAllForUser: () => EMPTY,
    getForDebt: () => EMPTY,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionListComponent],
      providers: [
        provideRouter([]),
        provideNativeDateAdapter(),
        { provide: TransactionService, useValue: transactionServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});