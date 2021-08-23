import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseTileLayerComponent } from './base-tile-layer.component';



@NgModule({
  declarations: [
    BaseTileLayerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BaseTileLayerComponent
  ]
})
export class BaseTileLayerModule { }
