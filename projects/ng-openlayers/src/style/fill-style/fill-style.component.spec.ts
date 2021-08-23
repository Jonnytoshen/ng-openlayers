import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillStyleComponent } from './fill-style.component';

describe('FillStyleComponent', () => {
  let component: FillStyleComponent;
  let fixture: ComponentFixture<FillStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FillStyleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FillStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
