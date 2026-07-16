import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCorrection } from './transaction-correction';

describe('TransactionCorrection', () => {
  let component: TransactionCorrection;
  let fixture: ComponentFixture<TransactionCorrection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionCorrection],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionCorrection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
