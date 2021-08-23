import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlTileSourceComponent } from './url-tile-source.component';

describe('UrlTileSourceComponent', () => {
  let component: UrlTileSourceComponent;
  let fixture: ComponentFixture<UrlTileSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrlTileSourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlTileSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
