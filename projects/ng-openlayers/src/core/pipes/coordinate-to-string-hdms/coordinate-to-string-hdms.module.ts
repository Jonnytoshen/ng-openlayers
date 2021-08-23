import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoordinateToStringHdmsPipe } from './coordinate-to-string-hdms.pipe';



@NgModule({
  declarations: [
    CoordinateToStringHdmsPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CoordinateToStringHdmsPipe
  ]
})
export class CoordinateToStringHdmsModule { }
