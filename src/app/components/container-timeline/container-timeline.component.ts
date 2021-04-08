import { Component, Input, OnInit } from '@angular/core';

import { DEFAULT_CONTENT_FILTER_ID } from '@constants/global';

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
    @Input() policyId: string = '';
    contentSubtype: number = DEFAULT_CONTENT_FILTER_ID;
    contentSubtypeName: string = 'Registrado';

    constructor() { }

    ngOnInit(): void {
    }

}
