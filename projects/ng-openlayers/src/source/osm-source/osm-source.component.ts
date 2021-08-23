import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, forwardRef, NgZone } from '@angular/core';
import OSM, { Options } from 'ol/source/OSM';
import { TileSourceComponent } from '../tile-source';
import { XYZSourceComponent } from '../xyz-source';

@Component({
  selector: 'ol-osm-source',
  exportAs: 'olOSMSource',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: TileSourceComponent,
    useExisting: forwardRef(() => OSMSourceComponent),
    multi: true
  }]
})
export class OSMSourceComponent extends XYZSourceComponent implements OnInit, Options {

  instance!: OSM

  constructor(ngZone: NgZone) {
    super(ngZone);
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.instance = new OSM(this);
      super.ngOnInit();
    });
  }

}
