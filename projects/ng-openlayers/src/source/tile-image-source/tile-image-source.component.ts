import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, OnInit, NgZone } from '@angular/core';
import { ImageTile } from 'ol';
import TileImageSource, { Options } from 'ol/source/TileImage';
import { UrlTileSourceComponent } from '../url-tile-source';

@Component({
  selector: 'ol-tile-image-source',
  exportAs: 'olTileImageSource',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TileImageSourceComponent extends UrlTileSourceComponent implements OnInit, Options {

  @Input() crossOrigin?: string;
  @Input() imageSmoothing?: boolean;
  @Input() reprojectionErrorThreshold?: number;
  @Input() tileClass?: ImageTile;

  instance!: TileImageSource

  constructor(ngZone: NgZone) {
    super(ngZone);
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      if (!this.instance) {
        this.instance = new TileImageSource(this);
      }
      super.ngOnInit();
    });
  }

}
