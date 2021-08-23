import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, NgZone } from '@angular/core';
import TileSource, { Options } from 'ol/source/Tile';
import TileGrid from 'ol/tilegrid/TileGrid';
import { SourceComponent } from '../source';

@Component({
  selector: 'ol-tile-source',
  exportAs: 'olTileSource',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TileSourceComponent extends SourceComponent implements Options {

  @Input() cacheSize?: number;
  @Input() opaque?: boolean;
  @Input() tilePixelRatio?: number;
  @Input() tileGrid?: TileGrid;
  @Input() transition?: number;
  @Input() key?: string;
  @Input() zDirection?: number;

  instance!: TileSource;

  constructor(ngZone: NgZone) {
    super(ngZone);
  }

}
