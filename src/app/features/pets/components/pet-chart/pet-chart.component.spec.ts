import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetChartComponent } from './pet-chart.component';

describe('PetChartComponent', () => {
  let component: PetChartComponent;
  let fixture: ComponentFixture<PetChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
