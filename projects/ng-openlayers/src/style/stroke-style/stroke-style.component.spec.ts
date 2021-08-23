import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrokeStyleComponent } from './stroke-style.component';

describe('StrokeStyleComponent', () => {
  let component: StrokeStyleComponent;
  let fixture: ComponentFixture<StrokeStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrokeStyleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StrokeStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
