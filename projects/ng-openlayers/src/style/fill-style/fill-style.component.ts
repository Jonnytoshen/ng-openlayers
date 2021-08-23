import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, OnChanges, OnDestroy, Input, Optional, SimpleChanges, NgZone } from '@angular/core';
import { Color } from 'ol/color';
import { ColorLike } from 'ol/colorlike';
import Fill, { Options } from 'ol/style/Fill';
import { RegularShapeStyleComponent } from '../regular-shape-style';
import { StyleComponent } from '../style';
import { TextStyleComponent } from '../text-style';

@Component({
  selector: 'ol-fill-style',
  exportAs: 'olFillStyle',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FillStyleComponent implements OnInit, OnChanges, OnDestroy, Options {

  @Input('olColor') color?: Color | ColorLike;
  @Input('olType') type: 'text-background-fill'|'fill' = 'fill';

  instance!: Fill;
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
      this.instance = new Fill(this);
      if (this.type === 'text-background-fill') {
        (this.host as TextStyleComponent).instance.setBackgroundFill(this.instance);
      } else if (this.type === 'fill') {
        if (this.host instanceof RegularShapeStyleComponent) {
          this.host.setFill(this.instance);
        } else {
          this.host.instance.setFill(this.instance);
        }
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instance) return;
    const { color } = changes;
    if (color) this.instance.setColor(color.currentValue);
  }

  ngOnDestroy(): void {
    const nullVal = (null as unknown) as Fill;
    if (this.type === 'text-background-fill') {
      (this.host as TextStyleComponent).instance.setBackgroundFill(nullVal);
    } else if (this.type === 'fill') {
      if (this.host instanceof RegularShapeStyleComponent) {
        this.host.setFill(nullVal);
      } else {
        this.host.instance.setFill(nullVal);
      }
    }
  }

}
