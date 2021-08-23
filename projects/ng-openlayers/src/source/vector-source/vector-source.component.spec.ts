import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VectorSourceComponent } from './vector-source.component';

describe('VectorSourceComponent', () => {
  let component: VectorSourceComponent;
  let fixture: ComponentFixture<VectorSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VectorSourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VectorSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
