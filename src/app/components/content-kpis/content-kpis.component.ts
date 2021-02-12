import { Component, Input, OnInit } from '@angular/core';

import { CONTENT_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';

import { ContentKpisService } from './content-kpis.service';

declare var CounterPlugin: any;

@Component({
  selector: 'agt-content-kpis',
  templateUrl: './content-kpis.component.html',
  styles: [
  ]
})
export class ContentKpisComponent implements OnInit {
    @Input() contentType: number;
    @Input() contentSubtype: number;
    ROUTES_NAME: any;
    contentTypeName: string;

    constructor(public contentKpisService: ContentKpisService) {
        this.contentType = 0;
        this.contentSubtype = 0;
        this.ROUTES_NAME = ROUTES_NAME;
        this.contentTypeName = '';
    }

    ngOnInit(): void {
        this.loadKpis();
    }

    /**
     * Load the kpis
     */
    private loadKpis(): void {
        this.contentKpisService.initKpis();
        switch(this.contentType) {
            case CONTENT_TYPES.LEAD:
                this.contentTypeName = 'Prospectos'
                this.contentKpisService.loadLeadKpis().subscribe( () => {
                    CounterPlugin.countUp();
                });
            break;
        }
    }

}
