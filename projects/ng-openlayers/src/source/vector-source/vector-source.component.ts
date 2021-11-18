import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, OnChanges, Input, SimpleChanges, Output, EventEmitter, NgZone } from '@angular/core';
import { Collection, Feature } from 'ol';
import BaseEvent from 'ol/events/Event';
import { FeatureLoader, FeatureUrlFunction } from 'ol/featureloader';
import FeatureFormat from 'ol/format/Feature';
import Geometry from 'ol/geom/Geometry';
import VectorSource, { LoadingStrategy, Options, VectorSourceEvent } from 'ol/source/Vector';
import { SourceComponent } from '../source';

@Component({
  selector: 'ol-vector-source',
  exportAs: 'olVectorSource',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VectorSourceComponent extends SourceComponent implements OnInit, OnChanges, Options {

  @Input('olFeatures') features?: Feature<Geometry>[] | Collection<Feature<Geometry>>;
  @Input('olFormat') format?: FeatureFormat;
  @Input('olLoader') loader?: FeatureLoader;
  @Input('olOverlaps') overlaps?: boolean;
  @Input('olStrategy') strategy?: LoadingStrategy;
  @Input('olUrl') url?: string | FeatureUrlFunction;
  @Input('olUseSpatialIndex') useSpatialIndex?: boolean;

  @Output('olOnAddfeature') addfeature$ = new EventEmitter<VectorSourceEvent<Geometry>>();
  @Output('olOnChangefeature') changefeature$ = new EventEmitter<BaseEvent>();
  @Output('olOnClear') clear$ = new EventEmitter<VectorSourceEvent<Geometry>>();
  @Output('olOnFeaturesloadend') featuresloadend$ = new EventEmitter<VectorSourceEvent<Geometry>>();
  @Output('olOnFeaturesloaderror') featuresloaderror$ = new EventEmitter<VectorSourceEvent<Geometry>>();
  @Output('olOnFeaturesloadstart') featuresloadstart$ = new EventEmitter<VectorSourceEvent<Geometry>>();
  @Output('olOnRemovefeature') removefeature$ = new EventEmitter<VectorSourceEvent<Geometry>>();

  instance!: VectorSource<Geometry>;

  constructor(ngZone: NgZone) {
    super(ngZone);
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      if (!this.instance) {
        this.instance = new VectorSource(this);
      }
      this.instance.on('addfeature', (event: VectorSourceEvent<Geometry>) => this.addfeature$.emit(event));
      this.instance.on('changefeature', (event: BaseEvent) => this.changefeature$.emit(event));
      this.instance.on('clear', (event: VectorSourceEvent<Geometry>) => this.clear$.emit(event));
      this.instance.on('featuresloadend', (event: VectorSourceEvent<Geometry>) => this.featuresloadend$.emit(event));
      this.instance.on('featuresloaderror', (event: VectorSourceEvent<Geometry>) => this.featuresloaderror$.emit(event));
      this.instance.on('featuresloadstart', (event: VectorSourceEvent<Geometry>) => this.featuresloadstart$.emit(event));
      this.instance.on('removefeature', (event: VectorSourceEvent<Geometry>) => this.removefeature$.emit(event));

      super.ngOnInit();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { loader, url, features, ...others } = changes;
    if (this.instance) {
      if (loader) this.instance.setLoader(loader.currentValue);
      if (url) this.instance.setUrl(url.currentValue);
      if (features) {
        this.instance.clear();
        this.instance.addFeatures(features.currentValue);
      }
    }
    super.ngOnChanges(others);
  }

}
