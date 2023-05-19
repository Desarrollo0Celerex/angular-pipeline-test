import { Injectable } from '@angular/core';
import {
    AbstractControl,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';

import { ValidatorsHelper } from '@core/helpers/validators.helper';
import { WalletContact } from '@interfaces/wallet-contact.interface';
import { UpdateWalletContactDataSend } from '@interfaces/update-wallet-contact-data-send.interface';
import { WalletContactService } from '@services/wallet-contact.service';

@Injectable()
export class WalletContactSService {
    form: UntypedFormGroup = this._formBuilder.group({});
    isBuiltForm: boolean = false;

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _walletContactService: WalletContactService
    ) {}

    /**
     * Get the form controls
     * @return Form controls
     */
    get f(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }

    loadWalletContacts(walletId: string): Observable<WalletContact> {
        const fields: string = '';
        return this._walletContactService.getWalletContacts(walletId, fields);
    }

    buildForm(walletContact: WalletContact): void {
        this.form = this._formBuilder.group({
            coveragesPhoneCode: [
                !!walletContact.coveragesPhoneCode
                    ? walletContact.coveragesPhoneCode
                    : walletContact.workspaceCountryId,
                [Validators.required],
            ],
            coveragesPhoneNumber: [
                walletContact.coveragesPhoneNumber,
                [Validators.required, ValidatorsHelper.phoneNumber],
            ],
            paymentsPhoneCode: [
                !!walletContact.paymentsPhoneCode
                    ? walletContact.paymentsPhoneCode
                    : walletContact.workspaceCountryId,
                [Validators.required],
            ],
            paymentsPhoneNumber: [
                walletContact.paymentsPhoneNumber,
                [Validators.required, ValidatorsHelper.phoneNumber],
            ],
            supportPhoneCode: [
                !!walletContact.supportPhoneCode
                    ? walletContact.supportPhoneCode
                    : walletContact.workspaceCountryId,
                [Validators.required],
            ],
            supportPhoneNumber: [
                walletContact.supportPhoneNumber,
                [Validators.required, ValidatorsHelper.phoneNumber],
            ],
            quotesPhoneCode: [
                !!walletContact.quotesPhoneCode
                    ? walletContact.quotesPhoneCode
                    : walletContact.workspaceCountryId,
                [Validators.required],
            ],
            quotesPhoneNumber: [
                walletContact.quotesPhoneNumber,
                [Validators.required, ValidatorsHelper.phoneNumber],
            ],
            sinistersPhoneCode: [
                !!walletContact.sinistersPhoneCode
                    ? walletContact.sinistersPhoneCode
                    : walletContact.workspaceCountryId,
                [Validators.required],
            ],
            sinistersPhoneNumber: [
                walletContact.sinistersPhoneNumber,
                [Validators.required, ValidatorsHelper.phoneNumber],
            ],
            coveragesPhoneCodeWhatsapp: [
                !!walletContact.coveragesPhoneCodeWhatsapp
                    ? walletContact.coveragesPhoneCodeWhatsapp
                    : walletContact.workspaceCountryId,
                [Validators.required],
            ],
            coveragesPhoneNumberWhatsapp: [
                walletContact.coveragesPhoneNumberWhatsapp,
                [Validators.required, ValidatorsHelper.phoneNumber],
            ],
            paymentsPhoneCodeWhatsapp: [
                !!walletContact.paymentsPhoneCodeWhatsapp
                    ? walletContact.paymentsPhoneCodeWhatsapp
                    : walletContact.workspaceCountryId,
                [Validators.required],
            ],
            paymentsPhoneNumberWhatsapp: [
                walletContact.paymentsPhoneNumberWhatsapp,
                [Validators.required, ValidatorsHelper.phoneNumber],
            ],
            supportPhoneCodeWhatsapp: [
                !!walletContact.supportPhoneCodeWhatsapp
                    ? walletContact.supportPhoneCodeWhatsapp
                    : walletContact.workspaceCountryId,
                [Validators.required],
            ],
            supportPhoneNumberWhatsapp: [
                walletContact.supportPhoneNumberWhatsapp,
                [Validators.required, ValidatorsHelper.phoneNumber],
            ],
            quotesPhoneCodeWhatsapp: [
                !!walletContact.quotesPhoneCodeWhatsapp
                    ? walletContact.quotesPhoneCodeWhatsapp
                    : walletContact.workspaceCountryId,
                [Validators.required],
            ],
            quotesPhoneNumberWhatsapp: [
                walletContact.quotesPhoneNumberWhatsapp,
                [Validators.required, ValidatorsHelper.phoneNumber],
            ],
            sinistersPhoneCodeWhatsapp: [
                !!walletContact.sinistersPhoneCodeWhatsapp
                    ? walletContact.sinistersPhoneCodeWhatsapp
                    : walletContact.workspaceCountryId,
                [Validators.required],
            ],
            sinistersPhoneNumberWhatsapp: [
                walletContact.sinistersPhoneNumberWhatsapp,
                [Validators.required, ValidatorsHelper.phoneNumber],
            ],
        });
        this.isBuiltForm = true;
    }

    updateWalletContact(walletId: string): Observable<void> {
        const requestBody: UpdateWalletContactDataSend = this.form.value;
        return this._walletContactService.updateWalletContact(
            walletId,
            requestBody
        );
    }
}
