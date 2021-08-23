import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoordinateToStringXYPipe } from './coordinate-to-string-xy.pipe';



@NgModule({
  declarations: [
    CoordinateToStringXYPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CoordinateToStringXYPipe
  ]
})
export class CoordinateToStringXYModule { }
