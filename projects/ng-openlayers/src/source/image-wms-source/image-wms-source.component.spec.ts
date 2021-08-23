import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageWMSSourceComponent } from './image-wms-source.component';

describe('ImageWMSSourceComponent', () => {
  let component: ImageWMSSourceComponent;
  let fixture: ComponentFixture<ImageWMSSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageWMSSourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageWMSSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
