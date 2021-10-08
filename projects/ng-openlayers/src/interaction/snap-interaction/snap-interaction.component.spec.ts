import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnapInteractionComponent } from './snap-interaction.component';

describe('SnapInteractionComponent', () => {
  let component: SnapInteractionComponent;
  let fixture: ComponentFixture<SnapInteractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnapInteractionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnapInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
