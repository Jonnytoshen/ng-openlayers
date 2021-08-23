import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input, forwardRef, NgZone } from '@angular/core';
import { Size } from 'ol/size';
import XYZSource, { Options } from 'ol/source/XYZ';
import { TileImageSourceComponent } from '../tile-image-source';
import { TileSourceComponent } from '../tile-source';

@Component({
  selector: 'ol-xyz-source',
  exportAs: 'olXYZSource',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: TileSourceComponent,
    useExisting: forwardRef(() => XYZSourceComponent),
    multi: true
  }]
})
export class XYZSourceComponent extends TileImageSourceComponent implements OnInit, Options {

  @Input('olMaxZoom') maxZoom?: number;
  @Input('olMinZoom') minZoom?: number;
  @Input('olMaxResolution') maxResolution?: number;
  @Input('olTileSize') tileSize?: number | Size;

  instance!: XYZSource;

  constructor(ngZone: NgZone) {
    super(ngZone);
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      if (!this.instance) {
        this.instance = new XYZSource(this);
      }
      super.ngOnInit();
    });
  }
}
