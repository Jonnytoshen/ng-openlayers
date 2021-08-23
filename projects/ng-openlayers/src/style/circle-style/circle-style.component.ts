import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, forwardRef, OnChanges, Input, SimpleChanges, NgZone } from '@angular/core';
import CircleStyle, { Options } from 'ol/style/Circle';
import { RegularShapeStyleComponent } from '../regular-shape-style';
import { StyleComponent } from '../style';

@Component({
  selector: 'ol-circle-style',
  exportAs: 'olCircleStyle',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: RegularShapeStyleComponent,
    useExisting: forwardRef(() => CircleStyleComponent),
    multi: false
  }]
})
export class CircleStyleComponent extends RegularShapeStyleComponent implements OnInit, OnChanges, Options {

  @Input('olRadius') radius!: number;

  instance!: CircleStyle;

  constructor(
    ngZone: NgZone,
    host: StyleComponent
  ) {
    super(ngZone, host);
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.instance = new CircleStyle(this);
      super.ngOnInit();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { radius, ...others } = changes;
    if (this.instance && radius) {
      this.instance.setRadius(radius.currentValue);
    }
    super.ngOnChanges(others);
  }

}
