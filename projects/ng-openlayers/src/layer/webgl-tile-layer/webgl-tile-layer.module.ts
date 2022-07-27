import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebGLTileLayerComponent } from './webgl-tile-layer.component';



@NgModule({
  declarations: [
    WebGLTileLayerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    WebGLTileLayerComponent
  ]
})
export class WebGLTileLayerModule { }
