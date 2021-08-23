import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit, NgZone } from '@angular/core';
import ImageSource, { ImageSourceEvent, Options } from 'ol/source/Image';
import { SourceComponent } from '../source';

@Component({
  selector: 'ol-image-source',
  exportAs: 'olImageSource',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageSourceComponent extends SourceComponent implements OnInit, Options {

  @Input('olImageSmoothing') imageSmoothing?: boolean;
  @Input('olResolutions') resolutions?: number[];

  @Output('imageloadend') imageloadend$ = new EventEmitter<ImageSourceEvent>();
  @Output('imageloaderror') imageloaderror$ = new EventEmitter<ImageSourceEvent>();
  @Output('imageloadstart') imageloadstart$ = new EventEmitter<ImageSourceEvent>();

  instance!: ImageSource;

  constructor(ngZone: NgZone) {
    super(ngZone);
  }

  ngOnInit(): void {
    if (this.instance) {
      this.instance.on('imageloadend', (event: ImageSourceEvent) => this.imageloadend$.emit(event));
      this.instance.on('imageloaderror', (event: ImageSourceEvent) => this.imageloaderror$.emit(event));
      this.instance.on('imageloadstart', (event: ImageSourceEvent) => this.imageloadstart$.emit(event));
    }
    super.ngOnInit();
  }

}
