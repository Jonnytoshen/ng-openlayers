import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, forwardRef, Input, NgZone } from '@angular/core';
import PinchZoom, { Options } from 'ol/interaction/PinchZoom';
import { InteractionComponent } from '../interaction';
import { PointerInteractionComponent } from '../pointer-interaction';

@Component({
  selector: 'ol-pinch-zoom-interaction',
  exportAs: 'olPinchZoomInteraction',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: InteractionComponent,
    useExisting: forwardRef(() => PinchZoomInteractionComponent),
    multi: true
  }]
})
export class PinchZoomInteractionComponent extends PointerInteractionComponent implements OnInit, Options {

  @Input('olDuration') duration?: number;

  constructor(ngZone: NgZone) {
    super(ngZone);
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.instance = new PinchZoom(this);
      super.ngOnInit();
    });
  }

}
