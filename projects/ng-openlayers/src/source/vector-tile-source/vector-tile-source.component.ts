import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, OnChanges, Input, NgZone } from '@angular/core';
import { Extent } from 'ol/extent';
import FeatureFormat from 'ol/format/Feature';
import VectorTile_1 from 'ol/VectorTile';
import VectorTile, { Options } from 'ol/source/VectorTile';
import { Size } from 'ol/size';
import { UrlTileSourceComponent } from '../url-tile-source';

@Component({
  selector: 'ol-vector-tile-source',
  exportAs: 'olVectorTileSource',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VectorTileSourceComponent extends UrlTileSourceComponent implements OnInit, OnChanges, Options {

  @Input('olExtent') extent?: Extent;
  @Input('olFormat') format?: FeatureFormat;
  @Input('olOverlaps') overlaps?: boolean;
  @Input('olTileClass') tileClass?: typeof VectorTile_1;
  @Input('olMaxZoom') maxZoom?: number;
  @Input('olMinZoom') minZoom?: number;
  @Input('olTileSize') tileSize?: number | Size;
  @Input('olMaxResolution') maxResolution?: number;

  instance!: VectorTile;

  constructor(ngZone: NgZone) {
    super(ngZone);
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      if (!this.instance) {
        this.instance = new VectorTile(this);
      }
      super.ngOnInit();
    });
  }

}
