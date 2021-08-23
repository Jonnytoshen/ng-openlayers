import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, forwardRef, OnChanges, Input, SimpleChanges, ContentChildren, QueryList, AfterContentInit, NgZone } from '@angular/core';
import Geometry from 'ol/geom/Geometry';
import BaseVectorLayer, { Options } from 'ol/layer/BaseVector';
import { OrderFunction } from 'ol/render';
import VectorSource from 'ol/source/Vector';
import Style, { StyleLike } from 'ol/style/Style';
import { distinctUntilChanged, map, startWith, takeUntil } from 'rxjs/operators';
import { BaseLayerRef, LAYER_PROVIDER } from '../../core/layer';
import { SourceComponent } from '../../source/source';
import { VectorSourceComponent } from '../../source/vector-source';
import { StyleComponent } from '../../style/style';
import { LayerComponent } from '../layer';

@Component({
  selector: 'ol-base-vector-layer',
  exportAs: 'olBaseVectorLayer',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: LAYER_PROVIDER,
    useExisting: forwardRef(() => BaseVectorLayerComponent),
    multi: true
  }]
})
export class BaseVectorLayerComponent extends LayerComponent implements OnInit, OnChanges, AfterContentInit, BaseLayerRef, Options {

  @Input('olRenderOrder') renderOrder?: OrderFunction;
  @Input('olRenderBuffer') renderBuffer?: number;
  @Input('olSource') source?: VectorSource<Geometry>|any;
  @Input('olDeclutter') declutter?: boolean;
  @Input('olStyle') style?: StyleLike;
  @Input('olUpdateWhileAnimating') updateWhileAnimating?: boolean;
  @Input('olUpdateWhileInteracting') updateWhileInteracting?: boolean;

  @ContentChildren(VectorSourceComponent) sources!: QueryList<SourceComponent>;
  @ContentChildren(StyleComponent) styles!: QueryList<StyleComponent>;

  instance!: BaseVectorLayer;

  constructor(ngZone: NgZone) {
    super(ngZone);
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      if (!this.instance) {
        this.instance = new BaseVectorLayer(this);
      }
      super.ngOnInit();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { style, ...others } = changes;
    if (this.instance && style) {
      this.instance.setStyle(style.currentValue);
    }
    super.ngOnChanges(others);
  }

  ngAfterContentInit(): void {
    this.styles.changes
      .pipe(
        takeUntil(this.destroy$),
        startWith(this.styles),
        map((styles: QueryList<StyleComponent>) => styles.map(s => s.instance)),
        map((styles: Style[]) => styles && styles.length ? styles : this.style),
        distinctUntilChanged()
      )
      .subscribe(styles => this.instance.setStyle(styles));
    super.ngAfterContentInit();
  }

}
