import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PinchZoomInteractionComponent } from './pinch-zoom-interaction.component';



@NgModule({
  declarations: [
    PinchZoomInteractionComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PinchZoomInteractionComponent
  ]
})
export class PinchZoomInteractionModule { }
