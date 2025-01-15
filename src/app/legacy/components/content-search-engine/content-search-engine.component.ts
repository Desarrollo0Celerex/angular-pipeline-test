import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { CONTENT_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';

import { ContentSearchEngineService } from './content-search-engine.service';

@Component({
    selector: 'agt-content-search-engine',
    templateUrl: './content-search-engine.component.html',
    styles: [],
    standalone: false
})
export class ContentSearchEngineComponent implements OnChanges {
    @Input() actionType: number;
    @Input() contactId: string;
    @Input() groupId: string = '';
    @Input() partnerId: string = '';
    @Input() policyId: string = '';
    @Input() contentType: number;
    @Input() contentTypeName: string;
    @Input() originContactId: string;
    @Input() originPolicyId: string;
    @Input() query: string;
    @Input() totalResults: number;
    @Output() searchValue: EventEmitter<string> = new EventEmitter<string>();

    constructor(
        public contentSearchEngineService: ContentSearchEngineService,
        private _router: Router
    ) {
        this.actionType = 0;
        this.contactId = '';
        this.contentType = 0;
        this.contentTypeName = '';
        this.originContactId = '';
        this.originPolicyId = '';
        this.query = '';
        this.totalResults = 0;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(typeof changes.query !== 'undefined') {
            this.contentSearchEngineService.searchForm.patchValue({query: this.query});
        }
    }

    /**
     * Submit event to search content
     */
    onSubmitSearchContent(): void {
        const query: string = this.contentSearchEngineService.f.query.value.trim();
        if(this.contentSearchEngineService.searchForm.valid && !!query) {
            switch(this.contentType) {
                case CONTENT_TYPES.CONTACT.ID:
                    this._router.navigate([ROUTES_NAME.listSearchResults], { queryParams: { contentType: this.contentType, contentTypeName: this.contentTypeName, query, actionType: this.actionType, originContactId: this.originContactId, originPolicyId: this.originPolicyId }});
                    break;

                case CONTENT_TYPES.LEAD.ID:
                    this._router.navigate([ROUTES_NAME.listSearchResults], { queryParams: { contentType: this.contentType, contentTypeName: this.contentTypeName, query }});
                    break;

                case CONTENT_TYPES.CLIENT.ID:
                    this._router.navigate([ROUTES_NAME.listSearchResults], { queryParams: { contentType: this.contentType, contentTypeName: this.contentTypeName, query }});
                    break;

                case CONTENT_TYPES.CONTACT_QUOTATION.ID:
                    this._router.navigate([ROUTES_NAME.listContactQuotations(this.contactId)], { queryParams: { query }});
                    break;

                case CONTENT_TYPES.POLICY.ID:
                    this._router.navigate([ROUTES_NAME.listContactPolicies(this.contactId)], { queryParams: { query }});
                    break;

                case CONTENT_TYPES.POLICY_INSURED.ID:
                    this._router.navigate([ROUTES_NAME.listPolicyInsureds(this.contactId, this.policyId)], { queryParams: { query }});
                    break;

                case CONTENT_TYPES.CONTACT_FILE.ID:
                    this._router.navigate([ROUTES_NAME.listContactFiles(this.contactId)], { queryParams: { query }});
                    break;

                case CONTENT_TYPES.CONTACT_SINISTER.ID:
                    this._router.navigate([ROUTES_NAME.listContactSinisters(this.contactId)], { queryParams: { query }});
                    break;

                case CONTENT_TYPES.GROUP.ID:
                    this._router.navigate([ROUTES_NAME.listSearchResults], { queryParams: { contentType: this.contentType, contentTypeName: this.contentTypeName, query }});
                    break;

                case CONTENT_TYPES.GROUP_POLICY.ID:
                    this._router.navigate([ROUTES_NAME.groupPolicies(this.groupId)], { queryParams: { contentType: this.contentType, contentTypeName: this.contentTypeName, query }});
                    break;

                case CONTENT_TYPES.GROUP_MEMBER.ID:
                    this._router.navigate([ROUTES_NAME.groupMembers(this.groupId)], { queryParams: { contentType: this.contentType, contentTypeName: this.contentTypeName, query }});
                    break;

                case CONTENT_TYPES.GROUP_SINISTER.ID:
                    this._router.navigate([ROUTES_NAME.groupSinisters(this.groupId)], { queryParams: { contentType: this.contentType, contentTypeName: this.contentTypeName, query }});
                    break;

                case CONTENT_TYPES.PARTNER.ID:
                    this._router.navigate([ROUTES_NAME.listSearchResults], { queryParams: { contentType: this.contentType, contentTypeName: this.contentTypeName, query }});
                    break;

                case CONTENT_TYPES.PARTNER_CLIENT.ID:
                    this._router.navigate([ROUTES_NAME.partnerClients(this.partnerId)], { queryParams: { contentType: this.contentType, contentTypeName: this.contentTypeName, query }});
                    break;

                case CONTENT_TYPES.PARTNER_POLICY.ID:
                    this._router.navigate([ROUTES_NAME.partnerPolicies(this.partnerId)], { queryParams: { contentType: this.contentType, contentTypeName: this.contentTypeName, query }});
                    break;

                case CONTENT_TYPES.PARTNER_SINISTER.ID:
                    this._router.navigate([ROUTES_NAME.partnerSinisters(this.partnerId)], { queryParams: { contentType: this.contentType, contentTypeName: this.contentTypeName, query }});
                    break;

                case CONTENT_TYPES.PAYMENT.ID:
                    this._router.navigate([ROUTES_NAME.listSearchResults], { queryParams: { contentType: this.contentType, contentTypeName: this.contentTypeName, query }});
                    break;

                case CONTENT_TYPES.SINISTER.ID:
                    this._router.navigate([ROUTES_NAME.listSearchResults], { queryParams: { contentType: this.contentType, contentTypeName: this.contentTypeName, query }});
                    break;

                case CONTENT_TYPES.INSURANCE.ID:
                    this.searchValue.emit(query);
                    break;
            }
        }
    }

}
