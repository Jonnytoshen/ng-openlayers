import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, forwardRef, Input, ContentChildren, QueryList, NgZone } from '@angular/core';
import BaseImageLayer, { Options } from 'ol/layer/BaseImage';
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
export class BaseImageLayerComponent extends LayerComponent implements OnInit, BaseLayerRef, Options<ImageSource> {

  @Input('olSource') source?: ImageSource;

  @ContentChildren(ImageSourceComponent) sources!: QueryList<ImageSourceComponent>;

  instance!: BaseImageLayer<ImageSource>;

  constructor(ngZone: NgZone) {
    super(ngZone);
  }

  ngOnInit(): void {
    if (!this.instance) {
      this.ngZone.runOutsideAngular(() => this.instance = new BaseImageLayer(this));
    }
    super.ngOnInit();
  }

}
