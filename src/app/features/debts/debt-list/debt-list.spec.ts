import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { EMPTY } from 'rxjs';

import { DebtListComponent } from './debt-list';
import { DebtService } from '../debt.service';

describe('DebtListComponent', () => {
  let component: DebtListComponent;
  let fixture: ComponentFixture<DebtListComponent>;

  const debtServiceMock = {
    getPaginated: () => EMPTY,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebtListComponent],
      providers: [
        provideRouter([]),
        { provide: DebtService, useValue: debtServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DebtListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});