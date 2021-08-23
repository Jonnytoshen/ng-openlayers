import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularShapeStyleComponent } from './regular-shape-style.component';

describe('RegularShapeStyleComponent', () => {
  let component: RegularShapeStyleComponent;
  let fixture: ComponentFixture<RegularShapeStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegularShapeStyleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularShapeStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
