import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, OnChanges, forwardRef, Input, SimpleChanges, NgZone } from '@angular/core';
import { LoadFunction } from 'ol/Image';
import ImageWMS, { Options } from 'ol/source/ImageWMS';
import { ImageSourceComponent } from '../image-source';
import { WMSServerType } from './image-wms-source.model';

@Component({
  selector: 'ol-image-wms-source',
  exportAs: 'olImageWMSSource',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: ImageSourceComponent,
    useExisting: forwardRef(() => ImageWMSSourceComponent),
    multi: true
  }]
})
export class ImageWMSSourceComponent extends ImageSourceComponent implements OnInit, OnChanges, Options {

  @Input('olCrossOrigin') crossOrigin?: string;
  @Input('olHidpi') hidpi?: boolean;
  @Input('olServerType') serverType?: WMSServerType;
  @Input('olImageLoadFunction') imageLoadFunction?: LoadFunction;
  @Input('olParams') params!: { [key: string]: any };
  @Input('olRatio') ratio?: number;
  @Input('olUrl') url!: string;

  instance!: ImageWMS;

  constructor(ngZone: NgZone) {
    super(ngZone);
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.instance = new ImageWMS(this);
      super.ngOnInit();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { imageLoadFunction, url, ...others } = changes;

    if (this.instance) {
      imageLoadFunction && this.instance.setImageLoadFunction(imageLoadFunction.currentValue);
      url && this.instance.setUrl(url.currentValue);
    }

    super.ngOnChanges(others);
  }

}
