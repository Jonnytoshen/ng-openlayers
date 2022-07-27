import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, forwardRef, NgZone, Input, ContentChildren, QueryList } from '@angular/core';
import WebGLTileLayer, { Options, Style } from 'ol/layer/WebGLTile';
import { LAYER_PROVIDER } from '../../core';
import { GeoTIFFSourceComponent } from '../../source/geo-tiff-source';
import { BaseTileLayerComponent } from '../base-tile-layer';

@Component({
  selector: 'ol-webgl-tile-layer',
  exportAs: 'olWebGLTileLayer',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: LAYER_PROVIDER,
    useExisting: forwardRef(() => WebGLTileLayerComponent),
    multi: true
  }, {
    provide: BaseTileLayerComponent,
    useExisting: forwardRef(() => WebGLTileLayerComponent),
    multi: false
  }]
})
export class WebGLTileLayerComponent extends BaseTileLayerComponent implements OnInit, Options {

  @Input('olStyle') style?: Style;
  @Input('olCacheSize') cacheSize?: number;

  @ContentChildren(GeoTIFFSourceComponent) sources!: QueryList<GeoTIFFSourceComponent>;

  instance!: WebGLTileLayer;

  constructor(ngZone: NgZone) {
    super(ngZone);
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.instance = new WebGLTileLayer(this);
      super.ngOnInit();
    });
  }

}
