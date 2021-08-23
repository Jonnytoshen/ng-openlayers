import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VectorTileLayerComponent } from './vector-tile-layer.component';



@NgModule({
  declarations: [
    VectorTileLayerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    VectorTileLayerComponent
  ]
})
export class VectorTileLayerModule { }
