import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { CONTENT_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { PAY_TRACKER_ROUTES } from '@core/constants/routes';
import { ContentResultData } from '@interfaces/content-result-data.interface';

@Component({
    selector: 'agt-content-back',
    templateUrl: './content-back.component.html',
    styles: [],
    standalone: false
})
export class ContentBackComponent {
    @Input() contactId: string = '';
    @Input() groupId: string = '';
    @Input() policyId: string = '';
    @Input() partnerId: string = '';
    @Input() contentResultData: ContentResultData = {
        loadedItems: 0,
        totalItems: 0,
    };
    @Input() contentType: number = 0;
    @Input() isLoadingContent: boolean = false;
    @Input() query: string = '';

    constructor(private _router: Router) {}

    /**
     * Event to back the main content view
     */
    onClickBack(): void {
        let route: string;
        switch (this.contentType) {
            case CONTENT_TYPES.CLIENT.ID:
                route = ROUTES_NAME.listClients;
                break;

            case CONTENT_TYPES.CONTACT.ID:
                route = ROUTES_NAME.listContacts;
                break;

            case CONTENT_TYPES.CONTACT_FILE.ID:
                route = ROUTES_NAME.listContactFiles(this.contactId);
                break;

            case CONTENT_TYPES.CONTACT_QUOTATION.ID:
                route = ROUTES_NAME.listContactQuotations(this.contactId);
                break;

            case CONTENT_TYPES.CONTACT_SINISTER.ID:
                route = ROUTES_NAME.listContactSinisters(this.contactId);
                break;

            case CONTENT_TYPES.GROUP.ID:
                route = ROUTES_NAME.listGroups;
                break;

            case CONTENT_TYPES.GROUP_MEMBER.ID:
                route = ROUTES_NAME.groupMembers(this.groupId);
                break;

            case CONTENT_TYPES.GROUP_POLICY.ID:
                route = ROUTES_NAME.groupPolicies(this.groupId);
                break;

            case CONTENT_TYPES.GROUP_SINISTER.ID:
                route = ROUTES_NAME.groupSinisters(this.groupId);
                break;

            case CONTENT_TYPES.LEAD.ID:
                route = ROUTES_NAME.listLeads;
                break;

            case CONTENT_TYPES.PARTNER.ID:
                route = ROUTES_NAME.listPartners;
                break;

            case CONTENT_TYPES.PARTNER_CLIENT.ID:
                route = ROUTES_NAME.partnerClients(this.partnerId);
                break;

            case CONTENT_TYPES.PARTNER_POLICY.ID:
                route = ROUTES_NAME.partnerPolicies(this.partnerId);
                break;

            case CONTENT_TYPES.PARTNER_SINISTER.ID:
                route = ROUTES_NAME.partnerSinisters(this.partnerId);
                break;

            case CONTENT_TYPES.PAYMENT.ID:
                route =
                    PAY_TRACKER_ROUTES.MODULE +
                    '/' +
                    PAY_TRACKER_ROUTES.PAYMENTS;
                break;

            case CONTENT_TYPES.POLICY.ID:
                route = ROUTES_NAME.listContactPolicies(this.contactId);
                break;

            case CONTENT_TYPES.POLICY_INSURED.ID:
                route = ROUTES_NAME.listPolicyInsureds(
                    this.contactId,
                    this.policyId
                );
                break;

            case CONTENT_TYPES.SINISTER.ID:
                route = ROUTES_NAME.listSinisters;
                break;

            default:
                route = '';
                break;
        }
        this._router.navigateByUrl(route);
    }
}
