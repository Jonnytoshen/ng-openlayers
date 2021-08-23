import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, OnChanges, SimpleChanges, Input, Output, EventEmitter, forwardRef, OnDestroy, NgZone } from '@angular/core';
import BaseEvent from 'ol/events/Event';
import { Extent } from 'ol/extent';
import BaseLayer, { Options } from 'ol/layer/Base';
import { ObjectEvent } from 'ol/Object';
import { Subject } from 'rxjs';
import { BaseLayerRef, LAYER_PROVIDER } from '../../core/layer';

@Component({
  selector: 'ol-base-layer',
  exportAs: 'olBaseLayer',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: LAYER_PROVIDER,
    useExisting: forwardRef(() => BaseLayerComponent),
    multi: true
  }]
})
export class BaseLayerComponent implements OnInit, OnChanges, OnDestroy, BaseLayerRef, Options {

  @Input('olClassName') className?: string;
  @Input('olOpacity') opacity?: number;
  @Input('olVisible') visible?: boolean;
  @Input('olExtent') extent?: Extent;
  @Input('olZIndex') zIndex?: number;
  @Input('olMinResolution') minResolution?: number;
  @Input('olMaxResolution') maxResolution?: number;
  @Input('olMinZoom') minZoom?: number;
  @Input('olMaxZoom') maxZoom?: number;

  @Output('olOnChange') change$ = new EventEmitter<BaseEvent>();
  @Output('olOnChangeExtent') changeExtent$ = new EventEmitter<ObjectEvent>();
  @Output('olOnChangeMaxResolution') changeMaxResolution$ = new EventEmitter<ObjectEvent>();
  @Output('olOnChangeMaxZoom') changeMaxZoom$ = new EventEmitter<ObjectEvent>();
  @Output('olOnChangeMinResolution') changeMinResolution$ = new EventEmitter<ObjectEvent>();
  @Output('olOnChangeMinZoom') changeMinZoom$ = new EventEmitter<ObjectEvent>();
  @Output('olOnChangeOpacity') changeOpacity$ = new EventEmitter<ObjectEvent>();
  @Output('olOnChangeSource') changeSource$ = new EventEmitter<ObjectEvent>();
  @Output('olOnChangeVisible') changeVisible$ = new EventEmitter<ObjectEvent>();
  @Output('olOnChangeZIndex') changeZIndex$ = new EventEmitter<ObjectEvent>();
  @Output('olOnError') error$ = new EventEmitter<BaseEvent>();
  @Output('olOnPropertychange') propertychange$ = new EventEmitter<ObjectEvent>();

  instance!: BaseLayer;
  destroy$ = new Subject<void>();

  constructor(public ngZone: NgZone) { }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      if (!this.instance) {
        this.instance = new BaseLayer(this);
      }
      this.instance.on('change', (event: BaseEvent) => this.change$.emit(event));
      this.instance.on('change:extent', (event: ObjectEvent) => this.changeExtent$.emit(event));
      this.instance.on('change:maxResolution', (event: ObjectEvent) => this.changeMaxResolution$.emit(event));
      this.instance.on('change:maxZoom', (event: ObjectEvent) => this.changeMaxZoom$.emit(event));
      this.instance.on('change:minResolution', (event: ObjectEvent) => this.changeMinResolution$.emit(event));
      this.instance.on('change:minZoom', (event: ObjectEvent) => this.changeMinZoom$.emit(event));
      this.instance.on('change:opacity', (event: ObjectEvent) => this.changeOpacity$.emit(event));
      this.instance.on('change:visible', (event: ObjectEvent) => this.changeVisible$.emit(event));
      this.instance.on('change:zIndex', (event: ObjectEvent) => this.changeZIndex$.emit(event));
      this.instance.on('error', (event: BaseEvent) => this.error$.emit(event));
      this.instance.on('propertychange', (event: ObjectEvent) => this.propertychange$.emit(event));
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instance) return;

    const properties: { [key: string]: any } = {};

    for (const key in changes) {
      if (Object.prototype.hasOwnProperty.call(changes, key)) {
        const val = changes[key].currentValue;

        switch (key) {
          case 'extent':
            this.instance.setExtent(val);
            break;
          case 'maxResolution':
            this.instance.setMaxResolution(val);
            break;
          case 'maxZoom':
            this.instance.setMaxZoom(val);
            break;
          case 'minResolution':
            this.instance.setMinResolution(val);
            break;
          case 'minZoom':
            this.instance.setMinZoom(val);
            break;
          case 'opacity':
            this.instance.setOpacity(val);
            break;
          case 'visible':
            this.instance.setVisible(val);
            break;
          case 'zIndex':
            this.instance.setZIndex(val);
            break;
          default:
            properties[key] = val;
            break;
        }

      }
    }

    if (Object.keys(properties).length > 0) {
      this.instance.setProperties(properties);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
