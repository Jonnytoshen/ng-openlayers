import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeoTIFFSourceComponent } from './geo-tiff-source.component';



@NgModule({
  declarations: [
    GeoTIFFSourceComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GeoTIFFSourceComponent
  ]
})
export class GeoTIFFSourceModule { }
