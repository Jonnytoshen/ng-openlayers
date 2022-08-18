import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TileWWMSSourceComponent } from './tile-wms-source.component';



@NgModule({
  declarations: [TileWWMSSourceComponent],
  exports: [TileWWMSSourceComponent],
  imports: [CommonModule]
})
export class TileWMSSourceModule { }
