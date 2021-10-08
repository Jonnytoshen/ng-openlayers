import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, forwardRef, NgZone, Input, Output, EventEmitter } from '@angular/core';
import { Collection, Feature } from 'ol';
import { Condition } from 'ol/events/condition';
import Geometry from 'ol/geom/Geometry';
import Modify, { ModifyEvent, Options } from 'ol/interaction/Modify';
import BaseVectorLayer from 'ol/layer/BaseVector';
import VectorSource from 'ol/source/Vector';
import VectorTile from 'ol/source/VectorTile';
import { StyleLike } from 'ol/style/Style';
import { InteractionComponent } from '../interaction';
import { PointerInteractionComponent } from '../pointer-interaction';

@Component({
  selector: 'ol-modify-interaction',
  exportAs: 'olModifyInteraction',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: InteractionComponent,
      useExisting: forwardRef(() => ModifyInteractionComponent),
      multi: true
    },
    {
      provide: PointerInteractionComponent,
      useExisting: forwardRef(() => ModifyInteractionComponent),
      multi: true
    }
  ]
})
export class ModifyInteractionComponent extends PointerInteractionComponent implements OnInit, Options {

  @Input('olCondition') condition?: Condition;
  @Input('olCeleteCondition') deleteCondition?: Condition;
  @Input('olInsertVertexCondition') insertVertexCondition?: Condition;
  @Input('olPixelTolerance') pixelTolerance?: number;
  @Input('olStyle') style?: StyleLike;
  @Input('olSource') source?: VectorSource<Geometry>;
  @Input('olHitDetection') hitDetection?: boolean | BaseVectorLayer<VectorSource<Geometry> | VectorTile>;
  @Input('olFeatures') features?: Collection<Feature<Geometry>>;
  @Input('olWrapX') wrapX?: boolean;

  @Output('olModifyend') modifyend$ = new EventEmitter<ModifyEvent>();
  @Output('olModifystart') modifystart$ = new EventEmitter<ModifyEvent>();

  instance!: Modify;

  constructor(ngZone: NgZone) {
    super(ngZone);
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.instance = new Modify(this);
      this.instance.on('modifyend', (event: ModifyEvent) => this.modifyend$.emit(event));
      this.instance.on('modifystart', (event: ModifyEvent) => this.modifystart$.emit(event));
    });
  }

}
