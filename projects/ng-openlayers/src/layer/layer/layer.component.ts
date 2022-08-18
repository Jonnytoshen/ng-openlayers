import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges, Output, EventEmitter, OnInit, forwardRef, AfterContentInit, ContentChildren, QueryList, NgZone } from '@angular/core';
import { PluggableMap } from 'ol';
import Layer, { Options, RenderFunction } from 'ol/layer/Layer';
import RenderEvent from 'ol/render/Event';
import Source from 'ol/source/Source';
import { distinctUntilChanged, map, startWith, takeUntil } from 'rxjs/operators';
import { BaseLayerRef, LAYER_PROVIDER } from '../../core/layer';
import { SourceComponent } from '../../source/source';
import { BaseLayerComponent } from '../base-layer';

@Component({
  selector: 'ol-layer',
  exportAs: 'olLayer',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: LAYER_PROVIDER,
    useExisting: forwardRef(() => LayerComponent),
    multi: true
  }]
})
export class LayerComponent extends BaseLayerComponent implements OnInit, OnChanges, AfterContentInit, BaseLayerRef, Options<Source> {

  @Input('olSource') source?: Source;
  @Input('olMap') map?: PluggableMap;
  @Input('olRender') render?: RenderFunction;

  @Output('olOnPostrender') postrender$ = new EventEmitter<RenderEvent>();
  @Output('olOnPrerender') prerender$ = new EventEmitter<RenderEvent>();

  @ContentChildren(SourceComponent) sourceComponents!: QueryList<SourceComponent>;

  instance!: Layer<Source>;

  constructor(ngZone: NgZone) {
    super(ngZone);
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      if (!this.instance) {
        this.instance = new Layer(this);
      }
      this.instance.on('postrender', (event: RenderEvent) => this.postrender$.emit(event));
      this.instance.on('prerender', (event: RenderEvent) => this.prerender$.emit(event));
      super.ngOnInit();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { source, map, ...others } = changes;

    if (this.instance && source) this.instance.setSource(source.currentValue);
    if (this.instance && map) this.instance.setMap(source.currentValue);

    super.ngOnChanges(others);
  }

  ngAfterContentInit(): void {
    this.sourceComponents.changes
      .pipe(
        takeUntil(this.destroy$),
        startWith(this.sourceComponents),
        map((sources: QueryList<SourceComponent>) => sources.last?.instance),
        distinctUntilChanged()
      )
      .subscribe(source => this.instance.setSource(source));
  }

}
