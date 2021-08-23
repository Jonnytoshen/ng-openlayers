import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleStyleComponent } from './circle-style.component';

describe('CircleStyleComponent', () => {
  let component: CircleStyleComponent;
  let fixture: ComponentFixture<CircleStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircleStyleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
