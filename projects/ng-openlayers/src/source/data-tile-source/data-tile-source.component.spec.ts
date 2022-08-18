import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTileSourceComponent } from './data-tile-source.component';

describe('DataTileSourceComponent', () => {
  let component: DataTileSourceComponent;
  let fixture: ComponentFixture<DataTileSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataTileSourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTileSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
