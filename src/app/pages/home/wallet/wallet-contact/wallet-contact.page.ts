import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { WalletContact } from '@interfaces/wallet-contact.interface';

import { WalletContactSService } from './wallet-contact-s.service';

@Component({
  selector: 'agt-wallet-contact',
  templateUrl: './wallet-contact.page.html',
  styles: [
  ],
  providers: [WalletContactSService]
})
export class WalletContactPage implements OnInit {
    private _isFormSubmitted: boolean = false;
    private _walletId: string = '';

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _walletContactSService: WalletContactSService
    ) { }

    ngOnInit(): void {
        this._catchParams();
        this._loadWalletContacts();
    }

    get model(): WalletContactSService {
        return this._walletContactSService;
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.model.form.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.model.form.get(constrolName);
        return InputValidatorHelper.getValidationClass(control, this._isFormSubmitted);
    }

    phoneCodeIdSelected(field: string, phoneCodeId: number): void {
        this.model.form.patchValue({[field]: phoneCodeId});
    }

    updateWalletContact(): void {
        this._isFormSubmitted = true;
        if(this.model.form.valid) {
            this.model.updateWalletContact(this._walletId).subscribe(() => {
                AlertHelper.walletContactUpdated();
            })
        }
    }

    private _catchParams(): void {
        this._walletId = this._activatedRoute.snapshot.params.walletId;
    }

    private _loadWalletContacts(): void {
        this.model.loadWalletContacts(this._walletId).subscribe((res: WalletContact) => {
            this.model.buildForm(res);
        })
    }

}
