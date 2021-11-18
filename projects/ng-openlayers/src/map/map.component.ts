import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input, Output, EventEmitter, ElementRef, AfterViewInit, OnChanges, SimpleChanges, NgZone, AfterContentInit, ContentChildren, QueryList, OnDestroy } from '@angular/core';
import { Collection, Map, MapBrowserEvent, MapEvent, Overlay, View } from 'ol';
import { ObjectEvent } from 'ol/Object';
import { MapOptions } from 'ol/PluggableMap';
import BaseEvent from 'ol/events/Event';
import BaseLayer from 'ol/layer/Base';
import { Control } from 'ol/control';
import { Interaction, defaults as defaultsInteraction } from 'ol/interaction';
import LayerGroup from 'ol/layer/Group';
import RenderEvent from 'ol/render/Event';
import { BaseLayerRef, LAYER_PROVIDER } from '../core/layer';
import { Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, startWith, takeUntil } from 'rxjs/operators';
import { InteractionComponent } from '../interaction/interaction';
import { ControlComponent } from '../control/control';
import { OverlayComponent } from '../overlay';

@Component({
  selector: 'ol-map',
  exportAs: 'olMap',
  template: `
    <div [style.width]="'100%'" [style.height]="'100%'"></div>
    <ng-content></ng-content>
  `,
  styles: [
  ],
  host: {
    '[style.display]': `'block'`,
    '[style.width]': `width`,
    '[style.height]': `height`
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit, OnChanges, AfterContentInit, AfterViewInit, OnDestroy, MapOptions {

  @Input('olWidth') width: string | number = '100%';
  @Input('olHeight') height: string | number = '100%';
  @Input('olControls') controls?: Collection<Control> | Control[];
  @Input('olPixelRatio') pixelRatio?: number;
  @Input('olInteractions') interactions?: Collection<Interaction> | Interaction[];
  @Input('olKeyboardEventTarget') keyboardEventTarget?: HTMLElement | Document | string;
  @Input('olLayers') layers?: BaseLayer[] | Collection<BaseLayer> | LayerGroup;
  @Input('olMaxTilesLoading') maxTilesLoading?: number;
  @Input('olMoveTolerance') moveTolerance?: number;
  @Input('olVverlays') overlays?: Collection<Overlay> | Overlay[];
  @Input('olTarget') target?: HTMLElement | string;
  @Input('olView') view?: View;

  @Output('olOnChange') change$ = new EventEmitter<BaseEvent>();
  @Output('olOnChangeLayerGroup') changeLayerGroup$ = new EventEmitter<ObjectEvent>();
  @Output('olOnChangeSize') changeSize$ = new EventEmitter<ObjectEvent>();
  @Output('olOnChangeTarget') changeTarget$ = new EventEmitter<ObjectEvent>();
  @Output('olOnChangeView') changeView$ = new EventEmitter<ObjectEvent>();
  @Output('olOnClick') click$ = new EventEmitter<MapBrowserEvent<UIEvent>>();
  @Output('olOnDblclick') dblclick$ = new EventEmitter<MapBrowserEvent<UIEvent>>();
  @Output('olOnError') error$ = new EventEmitter<BaseEvent>();
  @Output('olOnMoveend') moveend$ = new EventEmitter<MapEvent>();
  @Output('olOnMovestart') movestart$ = new EventEmitter<MapEvent>();
  @Output('olOnPointerdrag') pointerdrag$ = new EventEmitter<MapBrowserEvent<UIEvent>>();
  @Output('olOnPointermove') pointermove$ = new EventEmitter<MapBrowserEvent<UIEvent>>();
  @Output('olOnPostcompose') postcompose$ = new EventEmitter<RenderEvent>();
  @Output('olOnPostrender') postrender$ = new EventEmitter<MapEvent>();
  @Output('olOnPrecompose') precompose$ = new EventEmitter<RenderEvent>();
  @Output('olOnPropertychange') propertychange$ = new EventEmitter<ObjectEvent>();
  @Output('olOnRendercomplete') rendercomplete$ = new EventEmitter<RenderEvent>();
  @Output('olOnSingleclick') singleclick$ = new EventEmitter<MapBrowserEvent<UIEvent>>();

  @ContentChildren(LAYER_PROVIDER) layerComponents!: QueryList<BaseLayerRef>;
  @ContentChildren(InteractionComponent, { descendants: true }) interactionComponents!: QueryList<InteractionComponent>;
  @ContentChildren(ControlComponent, { descendants: true }) controlComponents!: QueryList<ControlComponent>;
  @ContentChildren(OverlayComponent, { descendants: true }) overlayComponents!: QueryList<OverlayComponent>;

  public instance!: Map;
  private destroy$ = new Subject<void>();

  constructor(
    private elementRef: ElementRef<HTMLDivElement>,
    private ngZone: NgZone
  ) { }

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

        if (key === 'target') {
          this.ngZone.runOutsideAngular(() => {
            this.instance.setTarget(val);
          });
        } else if (key === 'view') {
          this.ngZone.runOutsideAngular(() => {
            this.instance.setView(val);
          });
        } else {
          properties[key] = val;
        }
      }
    }

    if (Object.keys(properties).length > 0) {
      this.ngZone.runOutsideAngular(() => {
        this.instance.setProperties(properties);
      });
    }
  }

  ngAfterContentInit(): void {
    this.layerComponents.changes
      .pipe(
        takeUntil(this.destroy$),
        startWith(this.layerComponents),
        filter(() => !this.layers),
        map((components: QueryList<BaseLayerRef>) => components.map(c => c.instance)),
        distinctUntilChanged()
      )
      .subscribe(layers => {
        const collection = this.instance.getLayers();
        collection.clear();
        collection.extend(layers);
      });

    this.interactionComponents.changes
      .pipe(
        takeUntil(this.destroy$),
        startWith(this.interactionComponents),
        filter(() => !this.interactions),
        map((components: QueryList<InteractionComponent>) => components.map(c => c.instance)),
        map((interactions: Interaction[]) => defaultsInteraction().extend(interactions).getArray()),
        distinctUntilChanged()
      )
      .subscribe(interactions => {
        const collection = this.instance.getInteractions();
        collection.clear();
        collection.extend(interactions);
      });

    this.controlComponents.changes
      .pipe(
        takeUntil(this.destroy$),
        startWith(this.controlComponents),
        filter(() => !this.controls),
        map((components: QueryList<ControlComponent>) => components.map(c => c.instance)),
        distinctUntilChanged()
      )
      .subscribe(controls => {
        const collection = this.instance.getControls();
        collection.clear();
        collection.extend(controls);
      });
    this.overlayComponents.changes
      .pipe(
        takeUntil(this.destroy$),
        startWith(this.overlayComponents),
        filter(() => !this.overlays),
        map((components: QueryList<OverlayComponent>) => components.map(c => c.instance)),
        distinctUntilChanged()
      )
      .subscribe(overlays => {
        const collection = this.instance.getOverlays();
        collection.clear();
        collection.extend(overlays);
      });
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.instance.updateSize();
    });
  }

  ngOnDestroy(): void {
    this.instance.setTarget(undefined);
    this.destroy$.next();
    this.destroy$.complete();
  }

  private createInstance(): void {
    const target: HTMLElement = this.elementRef.nativeElement.firstElementChild as HTMLElement;
    this.instance = new Map({ ...this, target });
    this.instance.on('change', (event: BaseEvent) => this.change$.emit(event));
    this.instance.on('change:layergroup', (event: ObjectEvent) => this.changeLayerGroup$.emit(event));
    this.instance.on('change:size', (event: ObjectEvent) => this.changeSize$.emit(event));
    this.instance.on('change:target', (event: ObjectEvent) => this.changeTarget$.emit(event));
    this.instance.on('change:view', (event: ObjectEvent) => this.changeView$.emit(event));
    this.instance.on('click', (event: MapBrowserEvent<UIEvent>) => this.click$.emit(event));
    this.instance.on('dblclick', (event: MapBrowserEvent<UIEvent>) => this.dblclick$.emit(event));
    this.instance.on('error', (event: BaseEvent) => this.error$.emit(event));
    this.instance.on('moveend', (event: MapEvent) => this.moveend$.emit(event));
    this.instance.on('movestart', (event: MapEvent) => this.movestart$.emit(event));
    this.instance.on('pointerdrag', (event: MapBrowserEvent<UIEvent>) => this.pointerdrag$.emit(event));
    this.instance.on('pointermove', (event: MapBrowserEvent<UIEvent>) => this.pointermove$.emit(event));
    this.instance.on('postcompose', (event: RenderEvent) => this.postcompose$.emit(event));
    this.instance.on('postrender', (event: MapEvent) => this.postrender$.emit(event));
    this.instance.on('precompose', (event: RenderEvent) => this.precompose$.emit(event));
    this.instance.on('propertychange', (event: ObjectEvent) => this.propertychange$.emit(event));
    this.instance.on('rendercomplete', (event: RenderEvent) => this.rendercomplete$.emit(event));
    this.instance.on('singleclick', (event: MapBrowserEvent<UIEvent>) => this.singleclick$.emit(event));
  }

}
