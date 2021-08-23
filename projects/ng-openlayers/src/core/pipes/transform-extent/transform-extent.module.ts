import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransformExtentPipe } from './transform-extent.pipe';



@NgModule({
  declarations: [
    TransformExtentPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TransformExtentPipe
  ]
})
export class TransformExtentModule { }
