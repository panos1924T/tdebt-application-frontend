import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtDetail } from './debt-detail';

describe('DebtDetail', () => {
  let component: DebtDetail;
  let fixture: ComponentFixture<DebtDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebtDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(DebtDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
