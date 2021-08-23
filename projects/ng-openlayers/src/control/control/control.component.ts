import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ElementRef, NgZone, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MapEvent } from 'ol';
import Control, { Options } from 'ol/control/Control';
import BaseEvent from 'ol/events/Event';
import { ObjectEvent } from 'ol/Object';

@Component({
  selector: 'ol-control',
  exportAs: 'olControl',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlComponent implements OnInit, OnChanges, Options {

  @Input('olElement') element?: HTMLElement;
  @Input('olRender') render?: (p0: MapEvent) => void;
  @Input('olTarget') target?: HTMLElement | string;

  @Output('olChange') change$ = new EventEmitter<BaseEvent>();
  @Output('olError') error$ = new EventEmitter<BaseEvent>();
  @Output('olPropertychange') propertychange$ = new EventEmitter<ObjectEvent>();

  instance!: Control;

  constructor(
    public elementRef: ElementRef<HTMLDivElement>,
    public ngZone: NgZone
  ) { }

  ngOnInit(): void {
    if (!this.target) this.target = this.elementRef.nativeElement;

    this.ngZone.runOutsideAngular(() => {
      if (!this.instance) {
        this.instance = new Control(this);
      }
      this.instance.on('change', (event: BaseEvent) => this.change$.emit(event));
      this.instance.on('error', (event: BaseEvent) => this.error$.emit(event));
      this.instance.on('propertychange', (event: ObjectEvent) => this.propertychange$.emit(event));
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instance) return;
    const properties: { [key:string]: any } = {};

    for (const key in changes) {
      if (Object.prototype.hasOwnProperty.call(changes, key)) {
        const value = changes[key].currentValue;
        switch (key) {
          case 'target':
            this.instance.setTarget(value);
            break;
          default:
            properties[key] = value;
            break;
        }
      }
    }

    if (Object.keys(properties).length) {
      this.instance.setProperties(properties);
    }
  }

}
