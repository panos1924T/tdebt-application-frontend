import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { DebtFormComponent } from './debt-form';

describe('DebtFormComponent', () => {
  let component: DebtFormComponent;
  let fixture: ComponentFixture<DebtFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebtFormComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DebtFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
