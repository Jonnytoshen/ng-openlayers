import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, forwardRef, NgZone } from '@angular/core';
import ImageLayer from 'ol/layer/Image';
import CanvasImageLayerRenderer from 'ol/renderer/canvas/ImageLayer';
import ImageSource from 'ol/source/Image';
import { BaseLayerRef, LAYER_PROVIDER } from '../../core/layer';
import { BaseImageLayerComponent } from '../base-image-layer';

@Component({
  selector: 'ol-image-layer',
  exportAs: 'olImageLayer',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: LAYER_PROVIDER,
    useExisting: forwardRef(() => ImageLayerComponent),
    multi: true
  }, {
    provide: BaseImageLayerComponent,
    useExisting: forwardRef(() => ImageLayerComponent),
    multi: false
  }]
})
export class ImageLayerComponent extends BaseImageLayerComponent<ImageSource, CanvasImageLayerRenderer> implements OnInit, BaseLayerRef  {

  instance!: ImageLayer<ImageSource>;

  constructor(ngZone: NgZone) {
    super(ngZone);
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => this.instance = new ImageLayer(this));
    super.ngOnInit();
  }

}
