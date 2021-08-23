import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TileImageSourceComponent } from './tile-image-source.component';

describe('TileImageSourceComponent', () => {
  let component: TileImageSourceComponent;
  let fixture: ComponentFixture<TileImageSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TileImageSourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TileImageSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
