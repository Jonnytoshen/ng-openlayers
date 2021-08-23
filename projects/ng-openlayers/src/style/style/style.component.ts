import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, OnChanges, SimpleChanges, Input, NgZone } from '@angular/core';
import Geometry from 'ol/geom/Geometry';
import Style, { GeometryFunction, Options, RenderFunction } from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import ImageStyle from 'ol/style/Image';
import Text from 'ol/style/Text';

@Component({
  selector: 'ol-style',
  exportAs: 'olStyle',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StyleComponent implements OnInit, OnChanges, Options {

  @Input('olGeometry') geometry?: string | Geometry | GeometryFunction;
  @Input('olFill') fill?: Fill;
  @Input('olImage') image?: ImageStyle;
  @Input('olRenderer') renderer?: RenderFunction;
  @Input('olStroke') stroke?: Stroke;
  @Input('olText') text?: Text;
  @Input('olZIndex') zIndex?: number;

  instance!: Style;

  constructor(private ngZone: NgZone) { }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.instance = new Style(this);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instance) return;
    for (const key in changes) {
      if (Object.prototype.hasOwnProperty.call(changes, key)) {
        const val = changes[key].currentValue;
        switch (key) {
          case 'geometry':
            this.instance.setGeometry(val);
            break;
          case 'fill':
            this.instance.setFill(val);
            break;
          case 'image':
            this.instance.setImage(val);
            break;
          case 'renderer':
            this.instance.setRenderer(val);
            break;
          case 'stroke':
            this.instance.setStroke(val);
            break;
          case 'text':
            this.instance.setText(val);
            break;
          case 'zIndex':
            this.instance.setZIndex(val);
            break;
        }
      }
    }
  }

}
