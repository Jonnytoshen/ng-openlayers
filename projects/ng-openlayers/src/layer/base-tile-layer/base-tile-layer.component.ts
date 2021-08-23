import { Component, ViewEncapsulation, ChangeDetectionStrategy, OnChanges, SimpleChanges, Input, Output, EventEmitter, OnInit, forwardRef, ContentChildren, QueryList, NgZone } from '@angular/core';
import BaseTileLayer, { Options } from 'ol/layer/BaseTile';
import { ObjectEvent } from 'ol/Object';
import TileSource from 'ol/source/Tile';
import { BaseLayerRef, LAYER_PROVIDER } from '../../core/layer';
import { SourceComponent } from '../../source/source';
import { TileSourceComponent } from '../../source/tile-source';
import { LayerComponent } from '../layer';

@Component({
  selector: 'ol-base-tile-layer',
  exportAs: 'olBaseTileLayer',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: LAYER_PROVIDER,
    useExisting: forwardRef(() => BaseTileLayerComponent),
    multi: true
  }]
})
export class BaseTileLayerComponent extends LayerComponent implements OnInit, OnChanges, BaseLayerRef, Options {

  @Input('olPreload') preload?: number;
  @Input('olSource') source?: TileSource;
  @Input('olUseInterimTilesOnError') useInterimTilesOnError?: boolean;

  @Output('olOnChangePreload') changePreload$ = new EventEmitter<ObjectEvent>();
  @Output('olOnChangeUseInterimTilesOnError') changeUseInterimTilesOnError$ = new EventEmitter<ObjectEvent>();

  @ContentChildren(TileSourceComponent) sources!: QueryList<SourceComponent>;

  instance!: BaseTileLayer;

  constructor(ngZone: NgZone) {
    super(ngZone);
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      if (!this.instance) {
        this.instance = new BaseTileLayer(this);
      }
      this.instance.on('change:preload', (event: ObjectEvent) => this.changePreload$.emit(event));
      this.instance.on('change:useInterimTilesOnError', (event: ObjectEvent) => this.changeUseInterimTilesOnError$.emit(event));
      super.ngOnInit();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { preload, useInterimTilesOnError, ...others } = changes;

    if (this.instance && preload) this.instance.setPreload(preload.currentValue);
    if (this.instance && useInterimTilesOnError) this.instance.setUseInterimTilesOnError(useInterimTilesOnError.currentValue);

    super.ngOnChanges(others);
  }

}
