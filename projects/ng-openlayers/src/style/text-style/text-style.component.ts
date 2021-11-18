import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, OnChanges, OnDestroy, Input, SimpleChanges, NgZone } from '@angular/core';
import { Size } from 'ol/size';
import { Fill, Stroke } from 'ol/style';
import Text, { Options } from 'ol/style/Text';
import { TextPlacement } from './text-style.model';
import { StyleComponent } from '../style';

@Component({
  selector: 'ol-text-style',
  exportAs: 'olTextStyle',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextStyleComponent implements OnInit, OnChanges, OnDestroy, Options {

  @Input('olFont') font?: string;
  @Input('olMaxAngle') maxAngle?: number;
  @Input('olOffsetX') offsetX?: number;
  @Input('olOffsetY') offsetY?: number;
  @Input('olOverflow') overflow?: boolean;
  @Input('olPlacement') placement?: TextPlacement | string;
  @Input('olScale') scale?: number | Size;
  @Input('olRotateWithView') rotateWithView?: boolean;
  @Input('olRotation') rotation?: number;
  @Input('olText') text?: string;
  @Input('olTextAlign') textAlign?: string;
  @Input('olTextBaseline') textBaseline?: string;
  @Input('olFill') fill?: Fill;
  @Input('olStroke') stroke?: Stroke;
  @Input('olBackgroundFill') backgroundFill?: Fill;
  @Input('olBackgroundStroke') backgroundStroke?: Stroke;
  @Input('olPadding') padding?: number[];

  instance!: Text;

  constructor(
    private ngZone: NgZone,
    private host: StyleComponent
  ) { }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.instance = new Text(this);
      this.host.instance.setText(this.instance);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instance) return;
    for (const key in changes) {
      if (Object.prototype.hasOwnProperty.call(changes, key)) {
        const val = changes[key].currentValue;
        switch (key) {
          case 'font':
            this.instance.setFont(val);
            break;
          case 'maxAngle':
            this.instance.setMaxAngle(val);
            break;
          case 'offsetX':
            this.instance.setOffsetX(val);
            break;
          case 'offsetY':
            this.instance.setOffsetY(val);
            break;
          case 'overflow':
            this.instance.setOverflow(val);
            break;
          case 'placement':
            this.instance.setPlacement(val);
            break;
          case 'scale':
            this.instance.setScale(val);
            break;
          case 'rotateWithView':
            this.instance.setRotateWithView(val);
            break;
          case 'rotation':
            this.instance.setRotation(val);
            break;
          case 'text':
            this.instance.setText(val);
            break;
          case 'textAlign':
            this.instance.setTextAlign(val);
            break;
          case 'textBaseline':
            this.instance.setTextBaseline(val);
            break;
          case 'fill':
            this.instance.setFill(val);
            break;
          case 'stroke':
            this.instance.setStroke(val);
            break;
          case 'backgroundFill':
            this.instance.setBackgroundFill(val);
            break;
          case 'backgroundStroke':
            this.instance.setBackgroundStroke(val);
            break;
          case 'padding':
            this.instance.setPadding(val);
            break;
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.host.instance.setText((null as unknown) as Text);
  }

}
