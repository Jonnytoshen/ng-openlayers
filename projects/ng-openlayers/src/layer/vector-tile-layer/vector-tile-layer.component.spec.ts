import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VectorTileLayerComponent } from './vector-tile-layer.component';

describe('VectorTileLayerComponent', () => {
  let component: VectorTileLayerComponent;
  let fixture: ComponentFixture<VectorTileLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VectorTileLayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VectorTileLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
