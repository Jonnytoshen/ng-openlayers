import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, forwardRef, NgZone } from '@angular/core';
import Geometry from 'ol/geom/Geometry';
import VectorLayer from 'ol/layer/Vector';
import CanvasVectorLayerRenderer from 'ol/renderer/canvas/VectorLayer';
import VectorSource from 'ol/source/Vector';
import { BaseLayerRef, LAYER_PROVIDER } from '../../core/layer';
import { BaseVectorLayerComponent } from '../base-vector-layer';

@Component({
  selector: 'ol-vector-layer',
  exportAs: 'olVectorLayer',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: LAYER_PROVIDER,
    useExisting: forwardRef(() => VectorLayerComponent),
    multi: true
  }]
})
export class VectorLayerComponent extends BaseVectorLayerComponent<VectorSource<Geometry>, CanvasVectorLayerRenderer> implements OnInit, BaseLayerRef {

  instance!: VectorLayer<VectorSource<Geometry>>;

  constructor(ngZone: NgZone) {
    super(ngZone);
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      if (!this.instance) {
        this.instance = new VectorLayer(this);
      }
      super.ngOnInit();
    });
  }

}
