import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, forwardRef, ElementRef, NgZone, Input } from '@angular/core';
import Zoom, { Options } from 'ol/control/Zoom';
import { ControlComponent } from '../control';

@Component({
  selector: 'ol-zoom',
  exportAs: 'olZoom',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./zoom.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: ControlComponent,
      useExisting: forwardRef(() => ZoomComponent),
      multi: true
    }
  ]
})
export class ZoomComponent extends ControlComponent implements OnInit, Options {

  @Input('olDuration') duration?: number;
  @Input('olClassName') className?: string;
  @Input('olZoomInClassName') zoomInClassName?: string;
  @Input('olZoomOutClassName') zoomOutClassName?: string;
  @Input('olZoomInLabel') zoomInLabel?: string | HTMLElement;
  @Input('olZoomOutLabel') zoomOutLabel?: string | HTMLElement;
  @Input('olZoomInTipLabel') zoomInTipLabel?: string;
  @Input('olZoomOutTipLabel') zoomOutTipLabel?: string;
  @Input('olDelta') delta?: number;

  instance!: Zoom;

  constructor(elementRef: ElementRef<HTMLDivElement>, ngZone: NgZone) {
    super(elementRef, ngZone);
    this.elementRef.nativeElement.classList.add('ol-control-zoom');
  }

  ngOnInit(): void {
    if (!this.target) this.target = this.elementRef.nativeElement;

    this.ngZone.runOutsideAngular(() => {
      this.instance = new Zoom(this);
      super.ngOnInit();
    });
  }

}
