import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, NgZone, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { Collection, Feature } from 'ol';
import { Condition } from 'ol/events/condition';
import Geometry from 'ol/geom/Geometry';
import GeometryType from 'ol/geom/GeometryType';
import Draw, { DrawEvent, GeometryFunction } from 'ol/interaction/Draw';
import VectorSource from 'ol/source/Vector';
import { StyleLike } from 'ol/style/Style';
import { InteractionComponent } from '../interaction';
import { PointerInteractionComponent } from '../pointer-interaction';

export type DrawInteractionType
  = 'Circle'
  | 'LineString'
  | 'Point'
  | 'Polygon';

@Component({
  selector: 'ol-draw-interaction',
  exportAs: 'olDrawInteraction',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: InteractionComponent,
      useExisting: forwardRef(() => DrawInteractionComponent),
      multi: true
    },
    {
      provide: PointerInteractionComponent,
      useExisting: forwardRef(() => DrawInteractionComponent),
      multi: true
    }
  ]
})
export class DrawInteractionComponent extends PointerInteractionComponent implements OnInit {

  @Input('olType') type!: DrawInteractionType;
  @Input('olClickTolerance') clickTolerance?: number;
  @Input('olFeatures') features?: Collection<Feature<Geometry>>;
  @Input('olSource') source?: VectorSource<Geometry>;
  @Input('olDragVertexDelay') dragVertexDelay?: number;
  @Input('olSnapTolerance') snapTolerance?: number;
  @Input('olStopClick') stopClick?: boolean;
  @Input('olMaxPoints') maxPoints?: number;
  @Input('olMinPoints') minPoints?: number;
  @Input('olFinishCondition') finishCondition?: Condition;
  @Input('olStyle') style?: StyleLike;
  @Input('olGeometryFunction') geometryFunction?: GeometryFunction;
  @Input('olGeometryName') geometryName?: string;
  @Input('olCondition') condition?: Condition;
  @Input('olFreehand') freehand?: boolean;
  @Input('olFreehandCondition') freehandCondition?: Condition;
  @Input('olWrapX') wrapX?: boolean;

  @Output('olDrawabort') drawabort$ = new EventEmitter<DrawEvent>();
  @Output('olDrawend') drawend$ = new EventEmitter<DrawEvent>();
  @Output('olDrawstart') drawstart$ = new EventEmitter<DrawEvent>();

  instance!: Draw;

  constructor(ngZone: NgZone) {
    super(ngZone);
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      const type = this.type as GeometryType;
      this.instance = new Draw({ ...this, type });
      this.instance.on('drawabort', (event: DrawEvent) => this.drawabort$.emit(event));
      this.instance.on('drawend', (event: DrawEvent) => this.drawend$.emit(event));
      this.instance.on('drawstart', (event: DrawEvent) => this.drawstart$.emit(event));
      super.ngOnInit();
    });
  }

}
