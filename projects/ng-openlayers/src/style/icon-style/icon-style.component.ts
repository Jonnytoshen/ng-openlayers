import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, OnChanges, Input, SimpleChanges, NgZone } from '@angular/core';
import { Color } from 'ol/color';
import { Size } from 'ol/size';
import Icon, { Options } from 'ol/style/Icon';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import IconOrigin from 'ol/style/IconOrigin';
import { ImageStyleComponent } from '../image-style';
import { StyleComponent } from '../style';

@Component({
  selector: 'ol-icon-style',
  exportAs: 'olIconStyle',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconStyleComponent extends ImageStyleComponent implements OnInit, OnChanges, Options {

  @Input('olAnchor') anchor?: number[];
  @Input('olAnchorOrigin') anchorOrigin?: IconOrigin;
  @Input('olAnchorXUnits') anchorXUnits?: IconAnchorUnits;
  @Input('olAnchorYUnits') anchorYUnits?: IconAnchorUnits;
  @Input('olColor') color?: Color | string;
  @Input('olCrossOrigin') crossOrigin?: string;
  @Input('olImg') img?: HTMLImageElement | HTMLCanvasElement;
  @Input('olOffset') offset?: number[];
  @Input('olOffsetOrigin') offsetOrigin?: IconOrigin;
  @Input('olSize') size?: Size;
  @Input('olImgSize') imgSize?: Size;
  @Input('olSrc') src?: string;

  instance!: Icon;

  constructor(
    ngZone: NgZone,
    host: StyleComponent
  ) {
    super(ngZone, host);
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.instance = new Icon(this);
      super.ngOnInit();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { anchor, ...others } = changes;
    if (this.instance && anchor) {
      this.instance.setAnchor(anchor.currentValue);
    }
    super.ngOnChanges(others);
  }

}
