import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterSourceComponent } from './cluster-source.component';

describe('ClusterSourceComponent', () => {
  let component: ClusterSourceComponent;
  let fixture: ComponentFixture<ClusterSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClusterSourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
