import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input, Output, EventEmitter, OnDestroy, OnChanges, SimpleChanges, NgZone } from '@angular/core';
import { Coordinate } from 'ol/coordinate';
import BaseEvent from 'ol/events/Event';
import { Extent } from 'ol/extent';
import { ObjectEvent } from 'ol/Object';
import { ProjectionLike } from 'ol/proj';
import View, { ViewOptions } from 'ol/View';
import { MapComponent } from '../map';

@Component({
  selector: 'ol-view',
  exportAs: 'olView',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewComponent implements OnInit, OnChanges, OnDestroy, ViewOptions {

  @Input('olCenter') center?: Coordinate;
  @Input('olConstrainRotation') constrainRotation?: boolean | number;
  @Input('olEnableRotation') enableRotation?: boolean;
  @Input('olExtent') extent?: Extent;
  @Input('olConstrainOnlyCenter') constrainOnlyCenter?: boolean;
  @Input('olSmoothExtentConstraint') smoothExtentConstraint?: boolean;
  @Input('olMaxResolution') maxResolution?: number;
  @Input('olMinResolution') minResolution?: number;
  @Input('olMaxZoom') maxZoom?: number;
  @Input('olMinZoom') minZoom?: number;
  @Input('olMultiWorld') multiWorld?: boolean;
  @Input('olConstrainResolution') constrainResolution?: boolean;
  @Input('olSmoothResolutionConstraint') smoothResolutionConstraint?: boolean;
  @Input('olShowFullExtent') showFullExtent?: boolean;
  @Input('olProjection') projection?: ProjectionLike;
  @Input('olResolution') resolution?: number;
  @Input('olResolutions') resolutions?: number[];
  @Input('olRotation') rotation?: number;
  @Input('olZoom') zoom?: number;
  @Input('olZoomFactor') zoomFactor?: number;
  @Input('olPadding') padding?: number[];

  @Output('olOnChange') change$ = new EventEmitter<BaseEvent>();
  @Output('olOnChangeCenter') changeCenter$ = new EventEmitter<ObjectEvent>();
  @Output('olOnChangeResolution') changeResolution$ = new EventEmitter<ObjectEvent>();
  @Output('olOnChangeRotation') changeRotation$ = new EventEmitter<ObjectEvent>();
  @Output('olOnError') error$ = new EventEmitter<BaseEvent>();
  @Output('olOnPropertychange') propertychange$ = new EventEmitter<ObjectEvent>();

  instance!: View;

  constructor(
    private ngZone: NgZone,
    private host: MapComponent
  ) {
    if (!this.host) {
      throw new Error("The view component needs to be nested in the map component.");
    }
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.createInstance();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instance) return;

    const properties: { [key: string]: any } = {};

    for (const key in changes) {
      if (Object.prototype.hasOwnProperty.call(changes, key)) {
        const val = changes[key].currentValue;
        switch (key) {
          case 'center':
            this.ngZone.runOutsideAngular(() => {
              this.instance.setCenter(val);
            });
            break;
          case 'constrainResolution':
            this.ngZone.runOutsideAngular(() => {
              this.instance.setConstrainResolution(val);
            });
            break;
          case 'maxZoom':
            this.ngZone.runOutsideAngular(() => {
              this.instance.setMaxZoom(val);
            });
            break;
          case 'minZoom':
            this.ngZone.runOutsideAngular(() => {
              this.instance.setMinZoom(val);
            });
            break;
          case 'resolution':
            this.ngZone.runOutsideAngular(() => {
              this.instance.setResolution(val);
            });
            break;
          case 'rotation':
            this.ngZone.runOutsideAngular(() => {
              this.instance.setRotation(val);
            });
            break;
          case 'zoom':
            this.ngZone.runOutsideAngular(() => {
              this.instance.setZoom(val);
            });
            break;
          default:
            properties[key] = val;
            break;
        }
      }
    }

    if (Object.keys(properties).length > 0) {
      this.ngZone.runOutsideAngular(() => {
        this.instance.setProperties(properties);
      });
    }
  }

  ngOnDestroy(): void {
    this.host.instance.setView((null as unknown) as View);
  }

  private createInstance(): void {
    this.instance = new View(this);
    this.instance.on('change', (event: BaseEvent) => this.change$.emit(event));
    this.instance.on('change:center', (event: ObjectEvent) => this.changeCenter$.emit(event));
    this.instance.on('change:resolution', (event: ObjectEvent) => this.changeResolution$.emit(event));
    this.instance.on('change:rotation', (event: ObjectEvent) => this.changeRotation$.emit(event));
    this.instance.on('error', (event: BaseEvent) => this.error$.emit(event));
    this.instance.on('propertychange', (event: ObjectEvent) => this.propertychange$.emit(event));
    this.host.instance.setView(this.instance);
  }

}
