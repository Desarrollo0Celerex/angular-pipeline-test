import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

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
export class ContentKpisComponent implements OnInit, OnChanges {
    @Input() contentType: number;
    @Input() contentTypeName: string;
    @Input() contentSubtype: number;
    @Output() contentSubtypeNameLoaded: EventEmitter<string>;
    ROUTES_NAME: any;

    constructor(public contentKpisService: ContentKpisService) {
        this.contentType = 0;
        this.contentSubtype = 0;
        this.contentSubtypeNameLoaded = new EventEmitter<string>();
        this.ROUTES_NAME = ROUTES_NAME;
        this.contentTypeName = '';
    }

    ngOnInit(): void {
        this.loadKpis();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.contentSubtype.currentValue) {
            this._loadContactSubtypeName();
        }
    }

    /**
     * Load the kpis
     */
    private loadKpis(): void {
        this.contentKpisService.initKpis();
        switch(this.contentType) {
            case CONTENT_TYPES.LEAD.ID:
                this.contentKpisService.loadLeadKpis().subscribe( () => {
                    CounterPlugin.countUp();
                    this._loadContactSubtypeName();
                });
            break;
        }
    }

    /**
     * Load the content subtype name
     */
    private _loadContactSubtypeName(): void {
        const ContentSubtypeName: string = this.contentKpisService.getContentSubtypeName(this.contentSubtype);
        this.contentSubtypeNameLoaded.emit(ContentSubtypeName);
    }

}
