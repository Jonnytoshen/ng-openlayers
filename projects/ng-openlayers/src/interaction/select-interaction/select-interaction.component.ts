import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, forwardRef, NgZone, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Collection, Feature } from 'ol';
import { Condition } from 'ol/events/condition';
import Geometry from 'ol/geom/Geometry';
import Select, { FilterFunction, Options, SelectEvent } from 'ol/interaction/Select';
import Layer from 'ol/layer/Layer';
import Source from 'ol/source/Source';
import { StyleLike } from 'ol/style/Style';
import { InteractionComponent } from '../interaction';

@Component({
  selector: 'ol-select-interaction',
  exportAs: 'olSelectInteraction',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: InteractionComponent,
    useExisting: forwardRef(() => SelectInteractionComponent),
    multi: true
  }]
})
export class SelectInteractionComponent extends InteractionComponent implements OnInit, OnChanges, Options {

  @Input('olAddCondition') addCondition?: Condition;
  @Input('olCondition') condition?: Condition;
  @Input('olLayers') layers?: Layer<Source>[] | ((p0: Layer<Source>) => boolean);
  @Input('olStyle') style?: StyleLike;
  @Input('olRemoveCondition') removeCondition?: Condition;
  @Input('olToggleCondition') toggleCondition?: Condition;
  @Input('olMulti') multi?: boolean;
  @Input('olFeatures') features?: Collection<Feature<Geometry>>;
  @Input('olFilter') filter?: FilterFunction;
  @Input('olHitTolerance') hitTolerance?: number;

  @Output('olSelect') select$ = new EventEmitter<SelectEvent>();

  instance!: Select;

  constructor(ngZone: NgZone) {
    super(ngZone);
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.instance = new Select(this);
      this.instance.on('select', (event: SelectEvent) => this.select$.emit(event));
      super.ngOnInit();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { hitTolerance, ...others } = changes;
    if (this.instance) {
      if (hitTolerance) this.instance.setHitTolerance(hitTolerance.currentValue);
    }
    super.ngOnChanges(others);
  }

}
