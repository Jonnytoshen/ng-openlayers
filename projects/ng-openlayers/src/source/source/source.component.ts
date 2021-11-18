import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, SimpleChanges, NgZone } from '@angular/core';
import BaseEvent from 'ol/events/Event';
import { ObjectEvent } from 'ol/Object';
import { ProjectionLike } from 'ol/proj';
import Source, { AttributionLike, Options } from 'ol/source/Source';
import { State } from './source.model';

@Component({
  selector: 'ol-source',
  exportAs: 'olSource',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SourceComponent implements OnInit, OnChanges, Options {

  @Input('olAttributions') attributions?: AttributionLike;
  @Input('olAttributionsCollapsible') attributionsCollapsible?: boolean;
  @Input('olProjection') projection?: ProjectionLike;
  @Input('olState') state?: State;
  @Input('olWrapX') wrapX?: boolean;

  @Output('olOnChange') change$ = new EventEmitter<BaseEvent>();
  @Output('olOnError') error$ = new EventEmitter<BaseEvent>();
  @Output('olOnPropertychange') propertychange$ = new EventEmitter<ObjectEvent>();

  instance!: Source;

  constructor(public ngZone: NgZone) { }

  ngOnInit(): void {
    this.instance.on('change', (event: BaseEvent) => this.change$.emit(event));
    this.instance.on('error', (event: BaseEvent) => this.error$.emit(event));
    this.instance.on('propertychange', (event: ObjectEvent) => this.propertychange$.emit(event));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instance) return;

    const properties: { [key: string]: any } = {};

    for (const key in changes) {
      if (Object.prototype.hasOwnProperty.call(changes, key)) {
        const val = changes[key].currentValue;
        if (key === 'attributions') {
          this.instance.setAttributions(val);
        } else if (key === 'state') {
          this.instance.setState(val);
        } else {
          properties[key] = val;
        }
      }
    }

    if (Object.keys(properties).length > 0) {
      this.instance.setProperties(properties);
    }
  }
}
