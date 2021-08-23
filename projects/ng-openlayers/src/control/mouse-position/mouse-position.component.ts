import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, forwardRef, Input, Output, EventEmitter, ElementRef, NgZone, OnChanges, SimpleChanges } from '@angular/core';
import MousePosition, { Options } from 'ol/control/MousePosition';
import { CoordinateFormat } from 'ol/coordinate';
import { ObjectEvent } from 'ol/Object';
import { ProjectionLike } from 'ol/proj';
import { ControlComponent } from '../control';

@Component({
  selector: 'ol-mouse-position',
  exportAs: 'olMousePosition',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./mouse-position.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: ControlComponent,
      useExisting: forwardRef(() => MousePositionComponent),
      multi: true
    }
  ]
})
export class MousePositionComponent extends ControlComponent implements OnInit, OnChanges, Options {

  @Input('olClassName') className?: string;
  @Input('olCoordinateFormat') coordinateFormat?: CoordinateFormat;
  @Input('olProjection') projection?: ProjectionLike;
  @Input('olUndefinedHTML') undefinedHTML?: string;

  @Output('olChangeCoordinateFormat') changeCoordinateFormat$ = new EventEmitter<ObjectEvent>();
  @Output('olChangeProjection') changeProjection$ = new EventEmitter<ObjectEvent>();

  instance!: MousePosition;

  constructor(elementRef: ElementRef<HTMLDivElement>, ngZone: NgZone) {
    super(elementRef, ngZone);
    this.elementRef.nativeElement.classList.add('ol-mouse-position');
  }

  ngOnInit(): void {
    if (!this.target) this.target = this.elementRef.nativeElement;
    this.ngZone.runOutsideAngular(() => {
      this.instance = new MousePosition(this);
      this.instance.on('change:coordinateFormat', (event: ObjectEvent) => this.changeCoordinateFormat$.emit(event));
      this.instance.on('change:projection', (event: ObjectEvent) => this.changeProjection$.emit(event));
      super.ngOnInit();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { coordinateFormat, projection, ...others } = changes;
    if (this.instance && coordinateFormat) this.instance.setCoordinateFormat(coordinateFormat.currentValue);
    if (this.instance && projection) this.instance.setProjection(projection.currentValue);
    super.ngOnChanges(others);
  }

}
