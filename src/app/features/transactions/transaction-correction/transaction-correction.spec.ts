import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCorrectionComponent } from './transaction-correction';

describe('TransactionCorrectionComponent', () => {
  let component: TransactionCorrectionComponent;
  let fixture: ComponentFixture<TransactionCorrectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionCorrectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionCorrectionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
