import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, NgZone, Input } from '@angular/core';
import GeoTIFFSource, { Options, SourceInfo } from 'ol/source/GeoTIFF';
import { DataTileSourceComponent } from '../data-tile-source';

@Component({
  selector: 'ol-geo-tiff-source',
  exportAs: 'olGeoTIFFSource',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoTIFFSourceComponent extends DataTileSourceComponent implements OnInit, Options {

  @Input('olSources') sources: SourceInfo[] = [];
  @Input('olConvertToRGB') convertToRGB = false;
  @Input('olNormalize') normalize = true;

  instance!: GeoTIFFSource;

  constructor(ngZone: NgZone) {
    super(ngZone);
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.instance = new GeoTIFFSource(this);
      super.ngOnInit();
    });
  }

}
