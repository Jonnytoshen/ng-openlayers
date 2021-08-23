import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinchZoomInteractionComponent } from './pinch-zoom-interaction.component';

describe('PinchZoomInteractionComponent', () => {
  let component: PinchZoomInteractionComponent;
  let fixture: ComponentFixture<PinchZoomInteractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PinchZoomInteractionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PinchZoomInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
