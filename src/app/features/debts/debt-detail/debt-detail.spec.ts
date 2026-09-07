import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtDetailComponent } from './debt-detail';

describe('DebtDetailComponent', () => {
  let component: DebtDetailComponent;
  let fixture: ComponentFixture<DebtDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebtDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DebtDetailComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
