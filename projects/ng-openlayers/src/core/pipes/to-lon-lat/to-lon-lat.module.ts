import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToLonLatPipe } from './to-lon-lat.pipe';



@NgModule({
  declarations: [
    ToLonLatPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ToLonLatPipe
  ]
})
export class ToLonLatModule { }
