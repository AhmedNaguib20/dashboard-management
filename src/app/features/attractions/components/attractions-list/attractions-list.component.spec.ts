import { ComponentFixture, TestBed } from '@angular/core/testing';
import { attractionsListComponent } from './attractions-list.component';

describe('attractionsListComponent', () => {
  let component: attractionsListComponent;
  let fixture: ComponentFixture<attractionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [attractionsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(attractionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
