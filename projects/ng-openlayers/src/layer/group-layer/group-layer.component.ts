import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, OnChanges, forwardRef, Input, Output, EventEmitter, SimpleChanges, ContentChildren, QueryList, AfterContentChecked, OnDestroy, AfterContentInit, NgZone } from '@angular/core';
import { Collection } from 'ol';
import BaseLayer from 'ol/layer/Base';
import GroupLayer, { Options } from 'ol/layer/Group';
import { ObjectEvent } from 'ol/Object';
import { Subject } from 'rxjs';
import { distinctUntilChanged, map, startWith, takeUntil } from 'rxjs/operators';
import { BaseLayerRef, LAYER_PROVIDER } from '../../core/layer';
import { BaseLayerComponent } from '../base-layer';

@Component({
  selector: 'ol-group-layer',
  exportAs: 'olGroupLayer',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: LAYER_PROVIDER,
    useExisting: forwardRef(() => GroupLayerComponent),
    multi: true
  }]
})
export class GroupLayerComponent extends BaseLayerComponent implements OnInit, OnChanges, AfterContentInit, OnDestroy, BaseLayerRef, Options {

  @Input('olLayers') layers?: BaseLayer[] | Collection<BaseLayer>;

  @Output('olOnChangeLayers') changeLayers$ = new EventEmitter<ObjectEvent>();

  @ContentChildren(LAYER_PROVIDER) layerComponents!: QueryList<BaseLayerRef>;

  instance!: GroupLayer;

  constructor(ngZone: NgZone) {
    super(ngZone);
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.instance = new GroupLayer(this);
      super.ngOnInit();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { layers, ...others } = changes;

    if (this.instance && layers) this.instance.setLayers(layers.currentValue);

    super.ngOnChanges(others);
  }

  ngAfterContentInit(): void {
    this.layerComponents.changes
      .pipe(
        takeUntil(this.destroy$),
        startWith(this.layerComponents),
        map((components: QueryList<BaseLayerRef>) => components.map(c => c.instance)),
        distinctUntilChanged()
      )
      .subscribe(layers => {
        const collection = this.instance.getLayers();
        collection.clear();
        collection.extend(layers);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
