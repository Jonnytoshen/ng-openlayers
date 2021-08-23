import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, NgZone, Input, forwardRef } from '@angular/core';
import { MapBrowserEvent } from 'ol';
import PointerInteraction, { Options } from 'ol/interaction/Pointer';
import { InteractionComponent } from '../interaction';

@Component({
  selector: 'ol-pointer-interaction',
  exportAs: 'olPointerInteraction',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: InteractionComponent,
    useExisting: forwardRef(() => PointerInteractionComponent),
    multi: true
  }]
})
export class PointerInteractionComponent extends InteractionComponent implements OnInit, Options {

  @Input('olHandleDownEvent') handleDownEvent?: (p0: MapBrowserEvent<UIEvent>) => boolean;
  @Input('olHandleDragEvent') handleDragEvent?: (p0: MapBrowserEvent<UIEvent>) => void;
  @Input('olHandleMoveEvent') handleMoveEvent?: (p0: MapBrowserEvent<UIEvent>) => void;
  @Input('olHandleUpEvent') handleUpEvent?: (p0: MapBrowserEvent<UIEvent>) => boolean;
  @Input('olStopDown') stopDown?: (p0: boolean) => boolean;

  instance!: PointerInteraction;

  constructor(ngZone: NgZone) {
    super(ngZone);
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      if (!this.instance) {
        this.instance = new PointerInteraction(this);
      }
      super.ngOnInit();
    });
  }

}
