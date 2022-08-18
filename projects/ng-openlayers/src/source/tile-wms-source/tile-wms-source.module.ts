import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TileWMSSourceComponent } from './tile-wms-source.component';



@NgModule({
  declarations: [TileWMSSourceComponent],
  exports: [TileWMSSourceComponent],
  imports: [CommonModule]
})
export class TileWMSSourceModule { }
