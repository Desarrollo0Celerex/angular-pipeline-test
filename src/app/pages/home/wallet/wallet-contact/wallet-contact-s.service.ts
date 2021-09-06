import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { DEFAULT_PHONE_CODE_ID } from '@constants/global';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { WalletContact } from '@interfaces/wallet-contact.interface';
import { UpdateWalletContactDataSend } from '@interfaces/update-wallet-contact-data-send.interface';
import { WalletContactService } from '@services/wallet-contact.service';

@Injectable()
export class WalletContactSService {
    form: FormGroup = this._formBuilder.group({});
    isBuiltForm: boolean = false;

    constructor(
        private _formBuilder: FormBuilder,
        private _walletContactService: WalletContactService
    ) { }

    /**
     * Get the form controls
     * @return Form controls
     */
    get f(): { [key: string]: AbstractControl; }  {
        return this.form.controls;
    }

    loadWalletContacts(walletId: string): Observable<WalletContact> {
        const fields: string = '';
        return this._walletContactService.getWalletContacts(walletId, fields);
    }

    buildForm(walletContact: WalletContact): void {
        this.form = this._formBuilder.group({
            coveragesPhoneCode: [(!!walletContact.coveragesPhoneCode) ? walletContact.coveragesPhoneCode : DEFAULT_PHONE_CODE_ID, [Validators.required]],
            coveragesPhoneNumber: [walletContact.coveragesPhoneNumber, [Validators.required, ValidatorsHelper.phoneNumber]],
            paymentsPhoneCode: [(!!walletContact.paymentsPhoneCode) ? walletContact.paymentsPhoneCode : DEFAULT_PHONE_CODE_ID, [Validators.required]],
            paymentsPhoneNumber: [walletContact.paymentsPhoneNumber, [Validators.required, ValidatorsHelper.phoneNumber]],
            supportPhoneCode: [(!!walletContact.supportPhoneCode) ? walletContact.supportPhoneCode : DEFAULT_PHONE_CODE_ID, [Validators.required]],
            supportPhoneNumber: [walletContact.supportPhoneNumber, [Validators.required, ValidatorsHelper.phoneNumber]],
            quotesPhoneCode: [(!!walletContact.quotesPhoneCode) ? walletContact.quotesPhoneCode : DEFAULT_PHONE_CODE_ID, [Validators.required]],
            quotesPhoneNumber: [walletContact.quotesPhoneNumber, [Validators.required, ValidatorsHelper.phoneNumber]],
            sinistersPhoneCode: [(!!walletContact.sinistersPhoneCode) ? walletContact.sinistersPhoneCode : DEFAULT_PHONE_CODE_ID, [Validators.required]],
            sinistersPhoneNumber: [walletContact.sinistersPhoneNumber, [Validators.required, ValidatorsHelper.phoneNumber]],
            coveragesPhoneCodeWhatsapp: [(!!walletContact.coveragesPhoneCodeWhatsapp) ? walletContact.coveragesPhoneCodeWhatsapp : DEFAULT_PHONE_CODE_ID, [Validators.required]],
            coveragesPhoneNumberWhatsapp: [walletContact.coveragesPhoneNumberWhatsapp, [Validators.required, ValidatorsHelper.phoneNumber]],
            paymentsPhoneCodeWhatsapp: [(!!walletContact.paymentsPhoneCodeWhatsapp) ? walletContact.paymentsPhoneCodeWhatsapp : DEFAULT_PHONE_CODE_ID, [Validators.required]],
            paymentsPhoneNumberWhatsapp: [walletContact.paymentsPhoneNumberWhatsapp, [Validators.required, ValidatorsHelper.phoneNumber]],
            supportPhoneCodeWhatsapp: [(!!walletContact.supportPhoneCodeWhatsapp) ? walletContact.supportPhoneCodeWhatsapp : DEFAULT_PHONE_CODE_ID, [Validators.required]],
            supportPhoneNumberWhatsapp: [walletContact.supportPhoneNumberWhatsapp, [Validators.required, ValidatorsHelper.phoneNumber]],
            quotesPhoneCodeWhatsapp: [(!!walletContact.quotesPhoneCodeWhatsapp) ? walletContact.quotesPhoneCodeWhatsapp : DEFAULT_PHONE_CODE_ID, [Validators.required]],
            quotesPhoneNumberWhatsapp: [walletContact.quotesPhoneNumberWhatsapp, [Validators.required, ValidatorsHelper.phoneNumber]],
            sinistersPhoneCodeWhatsapp: [(!!walletContact.sinistersPhoneCodeWhatsapp) ? walletContact.sinistersPhoneCodeWhatsapp : DEFAULT_PHONE_CODE_ID, [Validators.required]],
            sinistersPhoneNumberWhatsapp: [walletContact.sinistersPhoneNumberWhatsapp, [Validators.required, ValidatorsHelper.phoneNumber]],
        });
        this.isBuiltForm = true;
    }

    updateWalletContact(walletId: string): Observable<void> {
        const requestBody: UpdateWalletContactDataSend = this.form.value;
        return this._walletContactService.updateWalletContact(walletId, requestBody);
    }
}
