import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XYZSourceComponent } from './xyz-source.component';

describe('XYZSourceComponent', () => {
  let component: XYZSourceComponent;
  let fixture: ComponentFixture<XYZSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XYZSourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XYZSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
