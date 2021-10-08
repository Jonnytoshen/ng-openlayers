import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, forwardRef, NgZone, Input } from '@angular/core';
import { Collection, Feature } from 'ol';
import Geometry from 'ol/geom/Geometry';
import Snap, { Options } from 'ol/interaction/Snap';
import VectorSource from 'ol/source/Vector';
import { InteractionComponent } from '../interaction';
import { PointerInteractionComponent } from '../pointer-interaction';

@Component({
  selector: 'ol-snap-interaction',
  exportAs: 'olSnapInteraction',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: InteractionComponent,
      useExisting: forwardRef(() => SnapInteractionComponent),
      multi: true
    },
    {
      provide: PointerInteractionComponent,
      useExisting: forwardRef(() => SnapInteractionComponent),
      multi: true
    }
  ]
})
export class SnapInteractionComponent extends PointerInteractionComponent implements OnInit, Options {

  @Input('olFeatures') features?: Collection<Feature<Geometry>>;
  @Input('olEdge') edge?: boolean;
  @Input('olVertex') vertex?: boolean;
  @Input('olPixelTolerance') pixelTolerance?: number;
  @Input('olSource') source?: VectorSource<Geometry>;

  instance!: Snap;

  constructor(ngZone: NgZone) {
    super(ngZone);
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.instance = new Snap(this);
    });
  }

}
