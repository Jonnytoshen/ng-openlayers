import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, OnChanges, OnDestroy, Input, Optional, SimpleChanges, NgZone } from '@angular/core';
import { Color } from 'ol/color';
import { ColorLike } from 'ol/colorlike';
import Stroke, { Options } from 'ol/style/Stroke';
import { RegularShapeStyleComponent } from '../regular-shape-style';
import { StyleComponent } from '../style';
import { TextStyleComponent } from '../text-style';

@Component({
  selector: 'ol-stroke-style',
  exportAs: 'olStrokeStyle',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StrokeStyleComponent implements OnInit, OnChanges, OnDestroy, Options {

  @Input('olColor') color?: Color | ColorLike;
  @Input('olLineCap') lineCap?: CanvasLineCap;
  @Input('olLineJoin') lineJoin?: CanvasLineJoin;
  @Input('olLineDash') lineDash?: number[];
  @Input('olLineDashOffset') lineDashOffset?: number;
  @Input('olMiterLimit') miterLimit?: number;
  @Input('olWidth') width?: number;
  @Input('olType') type: 'text-background-stroke'|'stroke' = 'stroke';

  instance!: Stroke;
  private host!: StyleComponent|TextStyleComponent|RegularShapeStyleComponent;

  constructor(
    private ngZone: NgZone,
    @Optional() styleHost: StyleComponent,
    @Optional() textHost: TextStyleComponent,
    @Optional() regularShapeHost: RegularShapeStyleComponent
  ) {
    this.host = regularShapeHost || textHost || styleHost;
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.instance = new Stroke(this);
      if (this.type === 'stroke') {
        if (this.host instanceof RegularShapeStyleComponent) {
          this.host.setStroke(this.instance);
        } else {
          this.host.instance.setStroke(this.instance);
        }
      } else if (this.type === 'text-background-stroke') {
        (this.host as TextStyleComponent).instance.setBackgroundStroke(this.instance);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instance) return;
    for (const key in changes) {
      if (Object.prototype.hasOwnProperty.call(changes, key)) {
        const val = changes[key].currentValue;
        switch (key) {
          case 'color':
            this.instance.setColor(val);
            break;
          case 'lineCap':
            this.instance.setLineCap(val);
            break;
          case 'lineJoin':
            this.instance.setLineJoin(val);
            break;
          case 'lineDash':
            this.instance.setLineDash(val);
            break;
          case 'lineDashOffset':
            this.instance.setLineDashOffset(val);
            break;
          case 'miterLimit':
            this.instance.setMiterLimit(val);
            break;
          case 'width':
            this.instance.setWidth(val);
            break;
        }
      }
    }
  }

  ngOnDestroy(): void {
    const nullVal = (null as unknown) as Stroke;
    if (this.type === 'stroke') {
      if (this.host instanceof RegularShapeStyleComponent) {
        this.host.setStroke(nullVal);
      } else {
        this.host.instance.setStroke(nullVal);
      }
    } else if (this.type === 'text-background-stroke') {
      (this.host as TextStyleComponent).instance.setBackgroundStroke(nullVal);
    }
  }

}
