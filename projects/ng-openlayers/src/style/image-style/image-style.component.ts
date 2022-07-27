import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, OnChanges, OnDestroy, Input, SimpleChanges, NgZone } from '@angular/core';
import { Size } from 'ol/size';
import ImageStyle, { Options } from 'ol/style/Image';
import { StyleComponent } from '../style';

@Component({
  selector: 'ol-image-style',
  exportAs: 'olImageStyle',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageStyleComponent implements OnInit, OnChanges, OnDestroy, Options {

  @Input('olOpacity') opacity!: number;
  @Input('olRotateWithView') rotateWithView!: boolean;
  @Input('olRotation') rotation!: number;
  @Input('olScale') scale!: number | Size;
  @Input('olDisplacement') displacement!: number[];
  @Input('olDeclutterMode') declutterMode!: 'declutter' | 'obstacle' | 'none' | undefined;

  instance!: ImageStyle;

  constructor(
    public ngZone: NgZone,
    private host: StyleComponent
  ) { }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.host.instance.setImage(this.instance);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instance) return;
    for (const key in changes) {
      if (Object.prototype.hasOwnProperty.call(changes, key)) {
        const val = changes[key].currentValue;
        switch (key) {
          case 'opacity':
            this.instance.setOpacity(val);
            break;
          case 'rotateWithView':
            this.instance.setRotateWithView(val);
            break;
          case 'rotation':
            this.instance.setRotation(val);
            break;
          case 'scale':
            this.instance.setScale(val);
            break;
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.host.instance.setImage((null as unknown) as ImageStyle);
  }

}
