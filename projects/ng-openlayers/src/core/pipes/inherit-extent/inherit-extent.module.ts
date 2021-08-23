import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InheritExtentPipe } from './inherit-extent.pipe';



@NgModule({
  declarations: [
    InheritExtentPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InheritExtentPipe
  ]
})
export class InheritExtentModule { }
