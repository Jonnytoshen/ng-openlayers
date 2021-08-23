import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TileSourceComponent } from './tile-source.component';

describe('TileSourceComponent', () => {
  let component: TileSourceComponent;
  let fixture: ComponentFixture<TileSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TileSourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TileSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
