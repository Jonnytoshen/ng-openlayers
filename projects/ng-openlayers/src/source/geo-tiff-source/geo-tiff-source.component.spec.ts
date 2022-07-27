import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoTIFFSourceComponent } from './geo-tiff-source.component';

describe('GeoTIFFSourceComponent', () => {
  let component: GeoTIFFSourceComponent;
  let fixture: ComponentFixture<GeoTIFFSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeoTIFFSourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoTIFFSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
