import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, NgZone, Input, Output, EventEmitter } from '@angular/core';
import { Size } from 'ol/size';
import DataTileSource, { Options } from 'ol/source/DataTile';
import { TileSourceEvent } from 'ol/source/Tile';
import { TileSourceComponent } from '../tile-source';
import { DataTileSourceLoader } from './data-tile-source.model';

@Component({
  selector: 'ol-data-tile-source',
  exportAs: 'olDataTileSource',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTileSourceComponent extends TileSourceComponent implements OnInit, Options {

  @Input('olLoader') loader?: DataTileSourceLoader;
  @Input('olMaxZoom') maxZoom?: number;
  @Input('olMinZoom') minZoom?: number;
  @Input('olTileSize') tileSize?: number | Size;
  @Input('olMaxResolution') maxResolution?: number;
  @Input('olBandCount') bandCount?: number;

  @Output('olTileloadend') tileloadend$ = new EventEmitter<TileSourceEvent>();
  @Output('olTileloaderror') tileloaderror$ = new EventEmitter<TileSourceEvent>();
  @Output('olTileloadstart') tileloadstart$ = new EventEmitter<TileSourceEvent>();

  instance!: DataTileSource;

  constructor(ngZone: NgZone) {
    super(ngZone);
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      if (!this.instance) {
        this.instance = new DataTileSource(this);
      }
      this.instance.on('tileloadend', (event: TileSourceEvent) => this.tileloadend$.emit(event));
      this.instance.on('tileloaderror', (event: TileSourceEvent) => this.tileloaderror$.emit(event));
      this.instance.on('tileloadstart', (event: TileSourceEvent) => this.tileloadstart$.emit(event));

      super.ngOnInit();
    });
  }

}
