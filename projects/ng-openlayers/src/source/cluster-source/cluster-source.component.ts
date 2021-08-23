import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, OnChanges, Input, SimpleChanges, NgZone, AfterContentInit, ContentChildren, QueryList, OnDestroy, forwardRef } from '@angular/core';
import { Feature } from 'ol';
import Geometry from 'ol/geom/Geometry';
import Point from 'ol/geom/Point';
import Cluster, { Options } from 'ol/source/Cluster';
import VectorSource from 'ol/source/Vector';
import { Subject } from 'rxjs';
import { distinctUntilChanged, map, startWith, takeUntil } from 'rxjs/operators';
import { SourceComponent } from '../source';
import { VectorSourceComponent } from '../vector-source/vector-source.component';

@Component({
  selector: 'ol-cluster-source',
  exportAs: 'olClusterSource',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: VectorSourceComponent,
    useExisting: forwardRef(() => ClusterSourceComponent),
    multi: true
  }]
})
export class ClusterSourceComponent extends VectorSourceComponent implements OnInit, OnChanges, AfterContentInit, OnDestroy, Options {

  @Input('olDistance') distance?: number;
  @Input('olGeometryFunction') geometryFunction?: (p0: Feature<Geometry>) => Point;
  @Input('olSource') source?: VectorSource<Geometry>;

  @ContentChildren(VectorSourceComponent) sources!: QueryList<VectorSourceComponent>;

  instance!: Cluster;

  private destroy$ = new Subject<void>();

  constructor(ngZone: NgZone) {
    super(ngZone);
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.instance = new Cluster(this);
      super.ngOnInit();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { distance, source, ...others } = changes;
    if (this.instance) {
      if (distance) this.instance.setDistance(distance.currentValue);
      if (source) this.instance.setSource(source.currentValue);
    }
    super.ngOnChanges(others);
  }

  ngAfterContentInit(): void {
    this.sources.changes
      .pipe(
        takeUntil(this.destroy$),
        startWith(this.sources),
        map((sources: QueryList<VectorSourceComponent>) => sources.last?.instance),
        distinctUntilChanged()
      )
      .subscribe(source => this.instance.setSource(source));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
