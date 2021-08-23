import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, forwardRef, NgZone } from '@angular/core';
import TileLayer from 'ol/layer/Tile';
import { BaseLayerRef, LAYER_PROVIDER } from '../../core/layer';
import { BaseTileLayerComponent } from '../base-tile-layer';

@Component({
  selector: 'ol-tile-layer',
  exportAs: 'olTileLayer',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: LAYER_PROVIDER,
    useExisting: forwardRef(() => TileLayerComponent),
    multi: true
  }, {
    provide: BaseTileLayerComponent,
    useExisting: forwardRef(() => TileLayerComponent),
    multi: false
  }]
})
export class TileLayerComponent extends BaseTileLayerComponent implements OnInit, BaseLayerRef  {

  instance!: TileLayer;

  constructor(ngZone: NgZone) {
    super(ngZone);
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.instance = new TileLayer(this);
      super.ngOnInit();
    });
  }

}
