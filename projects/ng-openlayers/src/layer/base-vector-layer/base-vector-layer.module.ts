import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseVectorLayerComponent } from './base-vector-layer.component';



@NgModule({
  declarations: [
    BaseVectorLayerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BaseVectorLayerComponent
  ]
})
export class BaseVectorLayerModule { }
