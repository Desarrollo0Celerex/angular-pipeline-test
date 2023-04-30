import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CONTACT_PROFILE_PAGE_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { UtilitiesHelper } from '@core/helpers/utilities.helper';
import { Policy } from '@interfaces/policy.interface';
import { SelectContactSourceData } from '@interfaces/select-contact-source-data.interface';
import { LoadingService } from '@core/services/loading/loading.service';

import { CardContactAnnualWalletService } from './card-contact-annual-wallet.service';

declare var ModalPlugin: any;

@Component({
    selector: 'agt-card-contact-annual-wallet',
    templateUrl: './card-contact-annual-wallet.component.html',
    styles: [],
    providers: [CardContactAnnualWalletService],
})
export class CardContactAnnualWalletComponent implements OnChanges {
    @Input() contactId: string = '';
    @Input() pageType: number = 0;
    CONTACT_PROFILE_PAGE_TYPES: any = CONTACT_PROFILE_PAGE_TYPES;
    insuranceId: number = 0;
    modalIdConfirmCreateSinister: string = 'ccaw-confirm-create-sinister';
    modalIdCreateSinister: string = 'ccaw-create-sinister';
    modalIdSearchContactPolicy: string = 'ccaw-search-contact-policy';
    modalIdSelectContactSource: string = 'ccaw-select-contact-source';
    policyId: string = '';
    searchContactPolicyMessage: string =
        'Ingresa la póliza a la que deseas reportar el siniestro.';
    year: number = UtilitiesHelper.getCurrentYear();

    constructor(
        public model: CardContactAnnualWalletService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _router: Router
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (!!changes.contactId && !!changes.contactId.currentValue) {
            this.model.loadContact(changes.contactId.currentValue);
            this.model.loadContactAnnualWallet(
                changes.contactId.currentValue,
                this.year
            );
        }
    }

    createPolicy(): void {
        this._router.navigateByUrl(ROUTES_NAME.createPolicy(this.contactId));
    }

    createQuotation(): void {
        this._router.navigateByUrl(ROUTES_NAME.createQuotation(this.contactId));
    }

    createSinister(): void {
        ModalPlugin.show(this.modalIdConfirmCreateSinister);
    }

    onCreateSinisterConfirmed(): void {
        ModalPlugin.show(this.modalIdSearchContactPolicy);
    }

    onPolicyFound(policy: Policy): void {
        this.policyId = policy.policyId;
        this.insuranceId = policy.insuranceId;
        ModalPlugin.show(this.modalIdCreateSinister);
    }

    onSinisterCreated(): void {
        this._reloadComponent();
    }

    showModelToSelectContactSource(): void {
        ModalPlugin.show(this.modalIdSelectContactSource);
    }

    updateContactSource(data: SelectContactSourceData): void {
        this._loadingService.show();
        this.model.updateContactSource(this.contactId, data).subscribe(() => {
            this._loadingService.hide();
            AlertHelper.contactSourceUpdated();
        });
    }

    private _reloadComponent(): void {
        this._router.routeReuseStrategy.shouldReuseRoute = () => false;
        this._router.onSameUrlNavigation = 'reload';
        this._router.navigate(
            [ROUTES_NAME.listContactSinisters(this.contactId)],
            { relativeTo: this._activatedRoute }
        );
    }
}
