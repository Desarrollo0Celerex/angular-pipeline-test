import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ACTION_TYPES, CONTACT_TYPES, CONTENT_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { CreateContactDataSend } from '@interfaces/create-contact-data-send.interface';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { SearchContactData } from '@interfaces/search-contact-data.interface';
import { LoadingService } from '@core/services/loading.service';

import { ListContactCoincidencesService } from './list-contact-coincidences.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-list-contact-coincidences',
    templateUrl: './list-contact-coincidences.page.html',
    styles: [],
})
export class ListContactCoincidencesPage implements OnInit, OnDestroy {
    actionType: number;
    contact: CreateContactDataSend | null;
    contactTypeId: number;
    contentType: number;
    contentTypeName: string;
    contentSubtype: number;
    contentSubtypeName: string;
    modalIdConfirmSaveContact: string;
    originContactId: string;
    originPolicyId: string;
    searchContactData: SearchContactData | null;
    totalResults: number;
    CONTACT_TYPES: any;
    private subParams: any;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _listContactCoincidencesService: ListContactCoincidencesService,
        private _loadingService: LoadingService,
        private _router: Router
    ) {
        this.actionType = 0;
        this.contact = null;
        this.contactTypeId = CONTACT_TYPES.PERSON;
        this.contentType = CONTENT_TYPES.CONTACT.ID;
        this.contentTypeName = CONTENT_TYPES.COINCIDENCES.NAME;
        this.contentSubtype = CONTENT_TYPES.COINCIDENCES.ID;
        this.contentSubtypeName = 'Encontrada';
        this.modalIdConfirmSaveContact = 'agt-confirm-save-contact';
        this.originContactId = '';
        this.originPolicyId = '';
        this.searchContactData = null;
        this.totalResults = 0;
        this.CONTACT_TYPES = CONTACT_TYPES;
    }

    ngOnInit(): void {
        this._catchParams();
        this._catchContactData();
        this._createSpecialQuery();
    }

    ngOnDestroy(): void {
        if (this.subParams) this.subParams.unsubscribe();
    }

    /**
     * Click event to show modal to confirm save the contact
     */
    onClickSaveContact(): void {
        ModalPlugin.show(this.modalIdConfirmSaveContact);
    }

    /**
     * Event to save contact
     */
    onSaveContact(): void {
        if (!!this.contact) {
            const requestBody: CreateContactDataSend = {
                name: !!this.contact.name ? this.contact.name : '',
                namePaternal: !!this.contact.namePaternal
                    ? this.contact.namePaternal
                    : '',
                nameMaternal: !!this.contact.nameMaternal
                    ? this.contact.nameMaternal
                    : '',
                companyName: !!this.contact.companyName
                    ? this.contact.companyName
                    : '',
                brandName: !!this.contact.brandName
                    ? this.contact.brandName
                    : '',
                email: !!this.contact.email ? this.contact.email : '',
                phoneCodeId: !!this.contact.phoneCodeId
                    ? this.contact.phoneCodeId
                    : 0,
                phoneNumber: !!this.contact.phoneNumber
                    ? this.contact.phoneNumber
                    : '',
                contactSourceId: !!this.contact.contactSourceId
                    ? this.contact.contactSourceId
                    : 0,
                contactSourceTypeId: !!this.contact.contactSourceTypeId
                    ? this.contact.contactSourceTypeId
                    : 0,
                countryId: !!this.contact.countryId
                    ? this.contact.countryId
                    : 0,
                stateId: !!this.contact.stateId ? this.contact.stateId : 0,
                contactTypeId: this.contactTypeId,
                ignoreMatches: true,
            };
            this._loadingService.show();
            this._listContactCoincidencesService
                .createContact(requestBody)
                .subscribe((res: HttpResponse) => {
                    this._doActionToSavedContact(res.data);
                });
        }
    }

    /**
     * Event to load the total results value
     * @param totalResults The total results
     */
    onTotalResultsLoaded(totalResults: number): void {
        this.totalResults = totalResults;
    }

    /**
     * Catch the contact data from state history
     */
    private _catchContactData(): void {
        this.contact = history.state.contact || null;
        if (!!this.contact) {
            this.contact.phoneCodeId = !!this.contact.phoneNumber
                ? this.contact.phoneCodeId
                : 0;
            this.contact.name = !!this.contact.name
                ? this.contact.name.trim()
                : '';
            this.contact.namePaternal = !!this.contact.namePaternal
                ? this.contact.namePaternal.trim()
                : '';
            this.contact.nameMaternal = !!this.contact.nameMaternal
                ? this.contact.nameMaternal.trim()
                : '';
            this.contact.companyName = !!this.contact.companyName
                ? this.contact.companyName.trim()
                : '';
            this.contact.brandName = !!this.contact.brandName
                ? this.contact.brandName.trim()
                : '';
        }
    }

    /**
     * Catch the params
     */
    private _catchParams(): void {
        this.subParams = this._activatedRoute.queryParams.subscribe(
            (params: Params) => {
                this.contactTypeId = parseInt(
                    params.contactTypeId || CONTACT_TYPES.PERSON
                );
                this.actionType = parseInt(params.actionType || 0);
                this.originContactId = params.originContactId || '';
                this.originPolicyId = params.originPolicyId || '';
            }
        );
    }

    /**
     * Create the query
     */
    private _createSpecialQuery(): void {
        if (!!this.contact) {
            this.searchContactData = {
                contactName:
                    this.contactTypeId === CONTACT_TYPES.PERSON
                        ? (
                              this.contact.name +
                              ' ' +
                              this.contact.namePaternal +
                              ' ' +
                              this.contact.nameMaternal
                          ).trim()
                        : this.contact.companyName!.trim(),
                brandName:
                    this.contactTypeId === CONTACT_TYPES.COMPANY
                        ? this.contact.brandName!.trim()
                        : '',
                email: this.contact.email || '',
                phoneNumber: this.contact.phoneNumber || '',
            };
        }
    }

    /**
     * Do action to the  saved contact
     * @param contactId The saved contact ID
     */
    private _doActionToSavedContact(contactId: string): void {
        switch (this.actionType) {
            case ACTION_TYPES.SELECT_CONTACT:
                this._loadingService.hide();
                this._router.navigateByUrl(
                    ROUTES_NAME.contactResume(contactId),
                    { state: { contactSaved: true } }
                );
                break;

            case ACTION_TYPES.RENEW_POLICY:
                this._listContactCoincidencesService
                    .renewPolicy(
                        this.originContactId,
                        this.originPolicyId,
                        contactId
                    )
                    .subscribe((res: HttpResponse) => {
                        this._loadingService.hide();
                        this._router.navigateByUrl(
                            ROUTES_NAME.uploadPolicy(contactId, res.data),
                            { state: { comesFromRenewalPolicy: true } }
                        );
                    });
                break;

            case ACTION_TYPES.REISSUE_POLICY:
                this._listContactCoincidencesService
                    .reissuePolicy(
                        this.originContactId,
                        this.originPolicyId,
                        contactId
                    )
                    .subscribe((res: HttpResponse) => {
                        this._loadingService.hide();
                        this._router.navigateByUrl(
                            ROUTES_NAME.uploadPolicy(contactId, res.data)
                        );
                    });
                break;

            default:
                this._loadingService.hide();
        }
    }
}
