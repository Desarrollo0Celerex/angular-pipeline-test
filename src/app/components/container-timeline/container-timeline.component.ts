import { Component, Input, OnInit } from '@angular/core';

import { DEFAULT_CONTENT_FILTER_ID, CONTENT_TYPES } from '@constants/global';

@Component({
  selector: 'agt-container-timeline',
  templateUrl: './container-timeline.component.html',
  styles: [
  ]
})
export class ContainerTimelineComponent implements OnInit {
    @Input() contactId: string = '';
    @Input() contentType: number = 0;
    @Input() contentTypeName: string = '';
    @Input() paymentId: string = '';
    @Input() policyId: string = '';
    CONTENT_TYPES: any = CONTENT_TYPES;
    contentSubtype: number = DEFAULT_CONTENT_FILTER_ID;
    contentSubtypeName: string = 'Registrado';

    constructor() { }

    ngOnInit(): void {
    }

}
