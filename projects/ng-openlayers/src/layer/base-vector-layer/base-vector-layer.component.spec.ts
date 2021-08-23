import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseVectorLayerComponent } from './base-vector-layer.component';

describe('BaseVectorLayerComponent', () => {
  let component: BaseVectorLayerComponent;
  let fixture: ComponentFixture<BaseVectorLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseVectorLayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseVectorLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
