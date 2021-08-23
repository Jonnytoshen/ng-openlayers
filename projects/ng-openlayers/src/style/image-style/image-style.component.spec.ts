import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageStyleComponent } from './image-style.component';

describe('ImageStyleComponent', () => {
  let component: ImageStyleComponent;
  let fixture: ComponentFixture<ImageStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageStyleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
