import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, ComponentFactoryResolver, ApplicationRef, Injector, ContentChild, TemplateRef, ViewContainerRef, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { DomPortalOutlet, TemplatePortal } from '@angular/cdk/portal'
import { Coordinate } from 'ol/coordinate';
import Overlay, { Options, PanIntoViewOptions, PanOptions } from 'ol/Overlay';
import OverlayPositioning from 'ol/OverlayPositioning';
import { OverlayContentDirective } from './overlay-content.directive';

@Component({
  selector: 'ol-overlay',
  exportAs: 'olOverlay',
  template: `<ng-content></ng-content>`,
  styles: [
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverlayComponent implements AfterViewInit, OnChanges, Options {

  @Input('olId') id?: number | string;
  @Input('olElement') element?: HTMLElement;
  @Input('olOffset') offset?: number[];
  @Input('olPosition') position?: Coordinate;
  @Input('olPositioning') positioning?: OverlayPositioning;
  @Input('olStopEvent') stopEvent?: boolean;
  @Input('olInsertFirst') insertFirst?: boolean;
  @Input('olAutoPan') autoPan?: PanIntoViewOptions | boolean;
  @Input('olAutoPanAnimation') autoPanAnimation?: PanOptions;
  @Input('olAutoPanMargin') autoPanMargin?: number;
  @Input('olAutoPanOptions') autoPanOptions?: PanIntoViewOptions;
  @Input('olClassName') className?: string;

  @ContentChild(OverlayContentDirective, { static: true, read: TemplateRef }) content!: TemplateRef<{}>;

  instance!: Overlay;

  constructor(
    private cfr: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private viewContainerRef: ViewContainerRef,
    private injector: Injector,
  ) { }

  ngAfterViewInit(): void {
    const element = this.element || document.createElement('div');
    const portalOutlet = new DomPortalOutlet(element, this.cfr, this.appRef, this.injector);
    const portal = new TemplatePortal(this.content, this.viewContainerRef);
    const componentRef = portalOutlet.attach(portal);
    this.instance = new Overlay({ ...this, element });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instance) return;

    const properties: { [key: string]: any } = {};

    for (const key in changes) {
      if (Object.prototype.hasOwnProperty.call(changes, key)) {
        const val = changes[key].currentValue;
        switch (key) {
          case 'element':
            this.instance.setElement(val);
            break;
          case 'offset':
            this.instance.setOffset(val);
            break;
          case 'position':
            this.instance.setPosition(val);
            break;
          case 'positioning':
            this.instance.setPositioning(val);
            break;
          default:
            properties[key] = val;
            break;
        }
      }
    }

    if (Object.keys(properties).length > 0) {
      this.instance.setProperties(properties);
    }
  }

}
