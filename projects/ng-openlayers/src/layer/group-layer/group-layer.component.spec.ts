import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupLayerComponent } from './group-layer.component';

describe('GroupLayerComponent', () => {
  let component: GroupLayerComponent;
  let fixture: ComponentFixture<GroupLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupLayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
