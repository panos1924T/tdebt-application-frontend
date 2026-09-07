import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtListComponent } from './debt-list';

describe('DebtListComponent', () => {
  let component: DebtListComponent;
  let fixture: ComponentFixture<DebtListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebtListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DebtListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
