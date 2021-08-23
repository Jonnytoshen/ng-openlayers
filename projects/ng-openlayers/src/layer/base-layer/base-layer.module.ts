import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseLayerComponent } from './base-layer.component';



@NgModule({
  declarations: [
    BaseLayerComponent
  ],
  exports: [
    BaseLayerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BaseLayerModule { }
