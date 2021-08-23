import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VectorLayerComponent } from './vector-layer.component';



@NgModule({
  declarations: [
    VectorLayerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    VectorLayerComponent
  ]
})
export class VectorLayerModule { }
