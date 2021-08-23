import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input, NgZone, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { MapBrowserEvent } from 'ol';
import BaseEvent from 'ol/events/Event';
import Interaction, { InteractionOptions } from 'ol/interaction/Interaction';
import { ObjectEvent } from 'ol/Object';
import { Subject } from 'rxjs';

@Component({
  selector: 'ol-interaction',
  exportAs: 'olInteraction',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InteractionComponent implements OnInit, OnChanges, OnDestroy, InteractionOptions {

  @Input('olHandleEvent') handleEvent!: (p0: MapBrowserEvent<UIEvent>) => boolean;
  @Input('olActive') active: boolean = true;

  @Output('olChange') change$ = new EventEmitter<BaseEvent>();
  @Output('olChangeActive') changeActive$ = new EventEmitter<ObjectEvent>();
  @Output('olError') error$ = new EventEmitter<BaseEvent>();
  @Output('olPropertychange') propertychange$ = new EventEmitter<ObjectEvent>();

  instance!: Interaction;
  public readonly destroy$ = new Subject<void>();

  constructor(public ngZone: NgZone) { }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      if (!this.instance) {
        this.instance = new Interaction(this);
      }
      this.instance.setActive(this.active);
      this.instance.on('change', (event: BaseEvent) => this.change$.emit(event));
      this.instance.on('change:active', (event: ObjectEvent) => this.changeActive$.emit(event));
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
        if (key === 'active') {
          this.instance.setActive(value);
        } else {
          properties[key] = value;
        }
      }
    }

    if (Object.keys(properties).length) {
      this.instance.setProperties(properties);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
