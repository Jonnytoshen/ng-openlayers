import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VectorTileSourceComponent } from './vector-tile-source.component';

describe('VectorTileSourceComponent', () => {
  let component: VectorTileSourceComponent;
  let fixture: ComponentFixture<VectorTileSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VectorTileSourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VectorTileSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
