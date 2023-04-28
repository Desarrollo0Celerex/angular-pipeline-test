import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { Client } from '@interfaces/client.interface';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { LoadingService } from '@core/services/loading.service';

import { ModalSearchClientService } from './modal-search-client.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-modal-search-client',
    templateUrl: './modal-search-client.component.html',
    styles: [],
    providers: [ModalSearchClientService],
})
export class ModalSearchClientComponent implements OnChanges {
    @Input() modalId: string = '';
    @Input() modalIdSelectClient: string = '';
    @Input() modalIdConfirmAddClient: string = '';
    @Input() groupId: string = '';
    foundClients: Client[] = [];
    clientIsAlreadyMember: boolean = false;
    isNoResults: boolean = false;
    /*modalIdSelectClient: string = 'agt-select-client-';
    modalIdConfirmAddClient: string = 'agt-confirm-add-client-';*/
    private _isFormSubmitted: boolean = false;
    private _selectedClient: Client | null = null;

    constructor(
        public model: ModalSearchClientService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _router: Router
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (!!changes.groupId && !!changes.groupId.currentValue) {
            this.model.loadGroupMembers(changes.groupId.currentValue);
        }
    }

    /**
     * Close modal
     */
    closeModal(): void {
        this.isNoResults = false;
        ModalPlugin.hide(this.modalId);
        this._resetSearchForm();
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null =
            this.model.form.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null =
            this.model.form.get(constrolName);
        return InputValidatorHelper.getValidationClass(
            control,
            this._isFormSubmitted
        );
    }

    searchClient(): void {
        this._isFormSubmitted = true;
        if (this.model.form.valid) {
            this._loadingService.show();
            this.model.getClients().subscribe((res: HttpResponse) => {
                const totalFoundClients: number = res.data.items.length;
                // If there are no clients
                if (totalFoundClients === 0) {
                    this.isNoResults = true;
                    this._resetSearchForm(this.model.f.name.value);
                } else {
                    // If the client was found and already member
                    if (
                        totalFoundClients === 1 &&
                        this._checkClientAlreadyMember(
                            res.data.items[0].contactId
                        )
                    ) {
                        this.clientIsAlreadyMember = true;
                    } else {
                        this.isNoResults = false;
                        ModalPlugin.hide(this.modalId);
                        this._resetSearchForm();
                        // If the client was found
                        if (totalFoundClients === 1) {
                            this.showModalToConfirmAddClient(res.data.items[0]);
                        }
                        // If there are multiple clients
                        else {
                            this.foundClients = res.data.items;
                            ModalPlugin.show(this.modalIdSelectClient);
                        }
                    }
                }
                setTimeout(() => {
                    this._loadingService.hide();
                }, 250);
            });
        }
    }

    showModalToConfirmAddClient(client: Client): void {
        this._selectedClient = client;
        ModalPlugin.show(this.modalIdConfirmAddClient);
    }

    selectClient(): void {
        if (!!this._selectedClient) {
            this._addClient(this._selectedClient);
        }
    }

    private _checkClientAlreadyMember(contactId: string): boolean {
        return this.model.groupMembers.includes(contactId) ? true : false;
    }

    private _addClient(client: Client): void {
        this._loadingService.show();
        this.model
            .addGroupMember(this.groupId, client.contactId)
            .subscribe(() => {
                this._loadingService.hide();
                AlertHelper.groupMemberAdded();
                this._reloadPage();
            });
    }

    private _reloadPage(): void {
        this._router.routeReuseStrategy.shouldReuseRoute = () => false;
        this._router.onSameUrlNavigation = 'reload';
        const url: string = this._router.url.split('?')[0];
        this._router.navigate([url], { relativeTo: this._activatedRoute });
    }

    /**
     * Reset the search form
     */
    private _resetSearchForm(name: string = ''): void {
        this.clientIsAlreadyMember = false;
        this._isFormSubmitted = false;
        this.model.form.reset({ name });
    }
}
