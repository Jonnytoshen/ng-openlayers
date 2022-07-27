import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, forwardRef, Input, ContentChildren, QueryList, NgZone } from '@angular/core';
import BaseImageLayer, { Options } from 'ol/layer/BaseImage';
import LayerRenderer from 'ol/renderer/Layer';
import ImageSource from 'ol/source/Image';
import { BaseLayerRef, LAYER_PROVIDER } from '../../core/layer';
import { ImageSourceComponent } from '../../source/image-source';
import { LayerComponent } from '../layer';

@Component({
  selector: 'ol-base-image-layer',
  exportAs: 'olBaseImageLayer',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: LAYER_PROVIDER,
    useExisting: forwardRef(() => BaseImageLayerComponent),
    multi: true
  }]
})
export class BaseImageLayerComponent<ImageSourceType extends ImageSource, RendererType extends LayerRenderer<any>> extends LayerComponent implements OnInit, BaseLayerRef, Options<ImageSourceType> {

  @Input('olSource') source?: ImageSourceType;

  @ContentChildren(ImageSourceComponent) sources!: QueryList<ImageSourceComponent>;

  instance!: BaseImageLayer<ImageSourceType, RendererType>;

  constructor(ngZone: NgZone) {
    super(ngZone);
  }

  ngOnInit(): void {
    if (!this.instance) {
      this.ngZone.runOutsideAngular(() => this.instance = new BaseImageLayer<ImageSourceType, RendererType>(this));
    }
    super.ngOnInit();
  }

}
