import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit, NgZone } from '@angular/core';
import { TileSourceEvent } from 'ol/source/Tile';
import UrlTile, { Options } from 'ol/source/UrlTile';
import { LoadFunction, UrlFunction } from 'ol/Tile';
import { TileSourceComponent } from '../tile-source';

@Component({
  selector: 'ol-url-tile-source',
  exportAs: 'olUrlTileSource',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UrlTileSourceComponent extends TileSourceComponent implements OnInit, OnChanges, Options {

  @Input('olTileLoadFunction') tileLoadFunction!: LoadFunction;
  @Input('olTileUrlFunction') tileUrlFunction?: UrlFunction;
  @Input('olUrl') url?: string;
  @Input('olUrls') urls?: string[];

  @Output('olOnTileloadend') tileloadend$ = new EventEmitter<TileSourceEvent>();
  @Output('olOnTileloaderror') tileloaderror$ = new EventEmitter<TileSourceEvent>();
  @Output('olOnTileloadstart') tileloadstart$ = new EventEmitter<TileSourceEvent>();

  instance!: UrlTile;

  constructor(ngZone: NgZone) {
    super(ngZone);
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      if (!this.instance) {
        this.instance = new UrlTile(this);
      }
      this.instance.on('tileloadend', (event: TileSourceEvent) => this.tileloadend$.emit(event));
      this.instance.on('tileloaderror', (event: TileSourceEvent) => this.tileloaderror$.emit(event));
      this.instance.on('tileloadstart', (event: TileSourceEvent) => this.tileloadstart$.emit(event));

      super.ngOnInit();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { tileLoadFunction, tileUrlFunction, url, urls, ...others } = changes;

    if (this.instance) {
      if (tileLoadFunction) this.instance.setTileLoadFunction(tileLoadFunction.currentValue);
      if (tileUrlFunction) this.instance.setTileUrlFunction(tileUrlFunction.currentValue);
      if (url) this.instance.setUrl(url.currentValue);
      if (urls) this.instance.setUrls(urls.currentValue);
    }

    super.ngOnChanges(others);
  }
}
