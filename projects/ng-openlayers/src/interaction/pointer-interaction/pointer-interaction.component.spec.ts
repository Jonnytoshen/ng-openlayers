import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointerInteractionComponent } from './pointer-interaction.component';

describe('PointerInteractionComponent', () => {
  let component: PointerInteractionComponent;
  let fixture: ComponentFixture<PointerInteractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointerInteractionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointerInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
