import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input, forwardRef, Output, EventEmitter, OnChanges, SimpleChanges, ContentChildren, QueryList, NgZone } from '@angular/core';
import VectorTileLayer, { Options } from 'ol/layer/VectorTile';
import { ObjectEvent } from 'ol/Object';
import CanvasVectorTileLayerRenderer from 'ol/renderer/canvas/VectorTileLayer';
import VectorTile from 'ol/source/VectorTile';
import { LAYER_PROVIDER } from '../../core/layer';
import { SourceComponent } from '../../source/source';
import { VectorTileSourceComponent } from '../../source/vector-tile-source';
import { BaseVectorLayerComponent } from '../base-vector-layer';
import { VectorTileRenderType } from './vector-tile-layer.model';

@Component({
  selector: 'ol-vector-tile-layer',
  exportAs: 'olVectorTileLayer',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: LAYER_PROVIDER,
    useExisting: forwardRef(() => VectorTileLayerComponent),
    multi: true
  }, {
    provide: BaseVectorLayerComponent,
    useExisting: forwardRef(() => VectorTileLayerComponent),
    multi: false
  }]
})
export class VectorTileLayerComponent extends BaseVectorLayerComponent<VectorTile, CanvasVectorTileLayerRenderer> implements OnInit, OnChanges, Options {

  @Input('olRenderMode') renderMode?: VectorTileRenderType | string;
  @Input('olSource') source?: VectorTile;
  @Input('olPreload') preload?: number;
  @Input('olUseInterimTilesOnError') useInterimTilesOnError?: boolean;

  @Output('olOnPreload') onPreload$ = new EventEmitter<ObjectEvent>();
  @Output('olOnUseInterimTilesOnError') onUseInterimTilesOnError$ = new EventEmitter<ObjectEvent>();

  @ContentChildren(VectorTileSourceComponent) sources!: QueryList<SourceComponent>;

  instance!: VectorTileLayer;

  constructor(ngZone: NgZone) {
    super(ngZone);
  }

  ngOnInit(): void {
    super.ngZone.runOutsideAngular(() => {
      if (!this.instance) {
        this.instance = new VectorTileLayer(this);
      }
      super.ngOnInit();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { preload, useInterimTilesOnError, ...others } = changes;
    if (this.instance) {
      if (preload) this.instance.setPreload(preload.currentValue);
      if (useInterimTilesOnError) this.instance.setUseInterimTilesOnError(useInterimTilesOnError.currentValue);
    }
    super.ngOnChanges(others);
  }

}
