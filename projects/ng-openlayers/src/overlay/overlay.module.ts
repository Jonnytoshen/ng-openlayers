import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayComponent } from './overlay.component';
import { OverlayContentDirective } from './overlay-content.directive';



@NgModule({
  declarations: [
    OverlayComponent,
    OverlayContentDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OverlayComponent,
    OverlayContentDirective
  ]
})
export class OverlayModule { }
