import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseTileLayerComponent } from './base-tile-layer.component';

describe('BaseTileLayerComponent', () => {
  let component: BaseTileLayerComponent;
  let fixture: ComponentFixture<BaseTileLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseTileLayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseTileLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
