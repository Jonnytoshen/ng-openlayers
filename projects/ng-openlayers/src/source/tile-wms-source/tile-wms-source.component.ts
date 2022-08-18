import { 
  Component, 
  OnInit, 
  ViewEncapsulation, 
  ChangeDetectionStrategy, 
  NgZone,
  Input,
  OnChanges,
  SimpleChanges,
  forwardRef
} from '@angular/core';
import TileWMS, { Options } from 'ol/source/TileWMS';
import { ServerType } from 'ol/source/wms';
import { TileImageSourceComponent } from '../tile-image-source';
import { TileSourceComponent } from '../tile-source';

@Component({
  selector: 'ol-tile-wms-source',
  exportAs: 'olTileWMSSource',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: TileSourceComponent,
    useExisting: forwardRef(() => TileWWMSSourceComponent),
    multi: true
  }]
})
export class TileWWMSSourceComponent extends TileImageSourceComponent implements OnInit, OnChanges, Options {

  @Input('olInterpolate') interpolate?: boolean; 
  @Input('olParams') params!: Record<string, any>;
  @Input('olGutter') gutter?: number;
  @Input('olHidpi') hidpi?: boolean;
  @Input('olServerType') serverType?: ServerType;

  instance!: TileWMS;

  constructor(ngZone: NgZone) { 
    super(ngZone);
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      if (!this.instance) {
        this.instance = new TileWMS(this);
      }
      super.ngOnInit();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { params, ...restChanges } = changes;

    if (this.instance && params) {
      this.instance.updateParams(params.currentValue);
    }

    super.ngOnChanges(restChanges);
  }

}
