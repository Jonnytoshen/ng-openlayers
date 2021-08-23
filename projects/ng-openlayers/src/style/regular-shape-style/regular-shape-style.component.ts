import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input, NgZone } from '@angular/core';
import { Fill, Stroke } from 'ol/style';
import RegularShape, { Options } from 'ol/style/RegularShape';
import { ImageStyleComponent } from '../image-style';
import { StyleComponent } from '../style';

@Component({
  selector: 'ol-regular-shape-style',
  exportAs: 'olRegularShapeStyle',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegularShapeStyleComponent extends ImageStyleComponent implements OnInit, Options {

  @Input('olFill') fill?: Fill;
  @Input('olPoints') points!: number;
  @Input('olRadius') radius?: number;
  @Input('olRadius1') radius1?: number;
  @Input('olRadius2') radius2?: number;
  @Input('olAngle') angle?: number;
  @Input('olStroke') stroke?: Stroke;

  instance!: RegularShape;

  constructor(
    ngZone: NgZone,
    host: StyleComponent
  ) {
    super(ngZone, host);
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      if (!this.instance) {
        this.instance = new RegularShape(this);
      }
      super.ngOnInit();
    });
  }

  setFill(fill: Fill): void {
    this.fill = fill;
    this.ngOnInit();
  }

  setStroke(stroke: Stroke): void {
    this.stroke = stroke;
    this.ngOnInit();
  }

}
