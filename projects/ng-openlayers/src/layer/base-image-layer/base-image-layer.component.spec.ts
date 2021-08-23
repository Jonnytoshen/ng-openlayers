import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseImageLayerComponent } from './base-image-layer.component';

describe('BaseImageLayerComponent', () => {
  let component: BaseImageLayerComponent;
  let fixture: ComponentFixture<BaseImageLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseImageLayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseImageLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
