import { Pipe, PipeTransform } from '@angular/core';
import { Extent } from 'ol/extent';

@Pipe({
  name: 'inheritExtent'
})
export class InheritExtentPipe implements PipeTransform {

  transform(value: Extent|'inherit'|undefined, inheritExtent: Extent): Extent {
    return value === 'inherit' ? inheritExtent : value as Extent;
  }

}
