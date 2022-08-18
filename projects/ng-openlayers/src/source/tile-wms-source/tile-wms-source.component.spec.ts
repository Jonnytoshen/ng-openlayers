import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TileWmsSourceComponent } from './tile-wms-source.component';

describe('TileWmsSourceComponent', () => {
  let component: TileWmsSourceComponent;
  let fixture: ComponentFixture<TileWmsSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TileWmsSourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TileWmsSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
