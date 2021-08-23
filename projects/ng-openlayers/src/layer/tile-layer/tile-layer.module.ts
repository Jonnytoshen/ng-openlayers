import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TileLayerComponent } from './tile-layer.component';



@NgModule({
  declarations: [
    TileLayerComponent
  ],
  exports: [
    TileLayerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TileLayerModule { }
