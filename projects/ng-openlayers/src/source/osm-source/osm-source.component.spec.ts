import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OSMSourceComponent } from './osm-source.component';

describe('OSMSourceComponent', () => {
  let component: OSMSourceComponent;
  let fixture: ComponentFixture<OSMSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OSMSourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OSMSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
