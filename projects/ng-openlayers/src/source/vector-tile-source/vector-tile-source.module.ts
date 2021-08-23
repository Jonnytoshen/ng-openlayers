import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VectorTileSourceComponent } from './vector-tile-source.component';



@NgModule({
  declarations: [
    VectorTileSourceComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    VectorTileSourceComponent
  ]
})
export class VectorTileSourceModule { }
