import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { CONTENT_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';

import { ContentKpisService } from './content-kpis.service';

declare var CounterPlugin: any;

@Component({
    selector: 'agt-content-kpis',
    templateUrl: './content-kpis.component.html',
    styles: [],
    standalone: false
})
export class ContentKpisComponent implements OnInit, OnChanges {
    @Input() contentType: number;
    @Input() contentTypeName: string;
    @Input() contentSubtype: number;
    @Input() canReloadContent: boolean = false;
    @Input() pageUrl: string = '';
    @Output() contentSubtypeNameSelected: EventEmitter<string>;
    ROUTES_NAME: any;

    constructor(public contentKpisService: ContentKpisService) {
        this.contentType = 0;
        this.contentSubtype = 0;
        this.contentSubtypeNameSelected = new EventEmitter<string>();
        this.ROUTES_NAME = ROUTES_NAME;
        this.contentTypeName = '';
    }

    ngOnInit(): void {
        this.loadKpis();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(!!changes.contentSubtype && !!changes.contentSubtype.currentValue) {
            this._loadContentSubtypeName();
        }
        if(!!changes.canReloadContent && !!changes.canReloadContent.currentValue) {
            this.loadKpis();
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
                    this._loadContentSubtypeName();
                });
            break;

            case CONTENT_TYPES.CLIENT.ID:
            this.contentKpisService.loadClientKpis().subscribe( () => {
                CounterPlugin.countUp();
                this._loadContentSubtypeName();
            });
            break;

            case CONTENT_TYPES.PAYMENT.ID:
            this.contentKpisService.loadPaymentKpis().subscribe( () => {
                CounterPlugin.countUp();
                this._loadContentSubtypeName();
            });
            break;

            case CONTENT_TYPES.SINISTER.ID:
            this.contentKpisService.loadSinisterKpis().subscribe( () => {
                CounterPlugin.countUp();
                this._loadContentSubtypeName();
            });
            break;

            case CONTENT_TYPES.PARTNER.ID:
            this.contentKpisService.loadPartnerKpis().subscribe( () => {
                CounterPlugin.countUp();
                this._loadContentSubtypeName();
            });
            break;

            case CONTENT_TYPES.GROUP.ID:
            this.contentKpisService.loadGroupKpis().subscribe( () => {
                CounterPlugin.countUp();
                this._loadContentSubtypeName();
            });
            break;
        }
    }

    /**
     * Load the content subtype name
     */
    private _loadContentSubtypeName(): void {
        const contentSubtypeName: string = this.contentKpisService.getContentSubtypeName(this.contentSubtype);
        setTimeout(() => {
            this.contentSubtypeNameSelected.emit(contentSubtypeName);
        }, 0);
    }

}
