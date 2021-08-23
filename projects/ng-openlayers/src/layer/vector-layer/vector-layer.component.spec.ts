import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VectorLayerComponent } from './vector-layer.component';

describe('VectorLayerComponent', () => {
  let component: VectorLayerComponent;
  let fixture: ComponentFixture<VectorLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VectorLayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VectorLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
