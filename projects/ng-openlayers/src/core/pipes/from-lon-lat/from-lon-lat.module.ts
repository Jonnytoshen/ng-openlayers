import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FromLonLatPipe } from './from-lon-lat.pipe';



@NgModule({
  declarations: [
    FromLonLatPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FromLonLatPipe
  ]
})
export class FromLonLatModule { }
