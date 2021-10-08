import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyInteractionComponent } from './modify-interaction.component';

describe('ModifyInteractionComponent', () => {
  let component: ModifyInteractionComponent;
  let fixture: ComponentFixture<ModifyInteractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyInteractionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
