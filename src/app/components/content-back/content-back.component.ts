import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { CONTENT_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { ContentResultData } from '@interfaces/content-result-data.interface';

@Component({
  selector: 'agt-content-back',
  templateUrl: './content-back.component.html',
  styles: [
  ]
})
export class ContentBackComponent {
    @Input() contactId: string = '';
    @Input() groupId: string = '';
    @Input() contentResultData: ContentResultData = {
        loadedItems: 0,
        totalItems: 0
    };
    @Input() contentType: number = 0;
    @Input() isLoadingContent: boolean = false;
    @Input() query: string = '';

    constructor(private _router: Router) { }

    /**
     * Event to back the main content view
     */
    onClickBack(): void {
        let route: string;
        switch(this.contentType){
            case CONTENT_TYPES.LEAD.ID:
                route = ROUTES_NAME.listLeads;
                break;

            case CONTENT_TYPES.CLIENT.ID:
                route = ROUTES_NAME.listClients;
                break;

            case CONTENT_TYPES.PAYMENT.ID:
                route = ROUTES_NAME.listPayments;
                break;

            case CONTENT_TYPES.SINISTER.ID:
                route = ROUTES_NAME.listSinisters;
                break;

            case CONTENT_TYPES.CONTACT_QUOTATION.ID:
                route = ROUTES_NAME.listContactQuotations(this.contactId);
                break;

            case CONTENT_TYPES.CONTACT_POLICY.ID:
                route = ROUTES_NAME.listContactPolicies(this.contactId);
                break;

            case CONTENT_TYPES.CONTACT_SINISTER.ID:
                route = ROUTES_NAME.listContactSinisters(this.contactId);
                break;

            case CONTENT_TYPES.GROUP.ID:
                route = ROUTES_NAME.listGroups;
                break;

            case CONTENT_TYPES.GROUP_POLICY.ID:
                route = ROUTES_NAME.groupPolicies(this.groupId);
                break;

            case CONTENT_TYPES.GROUP_SINISTER.ID:
                route = ROUTES_NAME.groupSinisters(this.groupId);
                break;

            case CONTENT_TYPES.CONTACT_FILE.ID:
                route = ROUTES_NAME.listContactFiles(this.contactId);
                break;

            default:
                route = '';
                break;
        }
        this._router.navigateByUrl(route);
    }

}
