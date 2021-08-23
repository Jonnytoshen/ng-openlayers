import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OSMSourceComponent } from './osm-source.component';



@NgModule({
  declarations: [
    OSMSourceComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OSMSourceComponent
  ]
})
export class OSMSourceModule { }
