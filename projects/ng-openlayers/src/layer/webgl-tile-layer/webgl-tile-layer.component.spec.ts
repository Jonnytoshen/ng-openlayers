import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebGLTileLayerComponent } from './webgl-tile-layer.component';

describe('WebGLTileLayerComponent', () => {
  let component: WebGLTileLayerComponent;
  let fixture: ComponentFixture<WebGLTileLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebGLTileLayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebGLTileLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
