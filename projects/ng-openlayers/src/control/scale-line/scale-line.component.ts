import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, forwardRef, Input, Output, EventEmitter, ElementRef, NgZone, OnChanges, SimpleChanges } from '@angular/core';
import ScaleLine, { Options, Units } from 'ol/control/ScaleLine';
import { ObjectEvent } from 'ol/Object';
import { ControlComponent } from '../control';

@Component({
  selector: 'ol-scale-line',
  exportAs: 'olScaleLine',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./scale-line.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: ControlComponent,
      useExisting: forwardRef(() => ScaleLineComponent),
      multi: true
    }
  ]
})
export class ScaleLineComponent extends ControlComponent implements OnInit, OnChanges, Options {

  @Input('olClassName') className?: string;
  @Input('olMinWidth') minWidth?: number;
  @Input('olUnits') units?: Units | string;
  @Input('olBar') bar?: boolean;
  @Input('olSteps') steps?: number;
  @Input('olText') text?: boolean;
  @Input('olDpi') dpi?: number;

  @Output('olChangeUnits') changeUnits$ = new EventEmitter<ObjectEvent>();

  instance!: ScaleLine

  constructor(elementRef: ElementRef<HTMLDivElement>, ngZone: NgZone) {
    super(elementRef, ngZone);
    this.elementRef.nativeElement.classList.add('ol-control-scale-line');
  }

  ngOnInit(): void {
    if (!this.target) this.target = this.elementRef.nativeElement;

    this.ngZone.runOutsideAngular(() => {
      this.instance = new ScaleLine(this);
      this.instance.on('change:units', (event: ObjectEvent) => this.changeUnits$.emit(event));
      super.ngOnInit();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { dpi, units, ...others } = changes;

    if (this.instance && dpi) this.instance.setDpi(dpi.currentValue);
    if (this.instance && units) this.instance.setUnits(units.currentValue);

    super.ngOnChanges(changes);
  }

}
