import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[olOverlayContent]',
  exportAs: 'olOverlayContent'
})
export class OverlayContentDirective {

  constructor(public templateRef: TemplateRef<{}>) {}

}
