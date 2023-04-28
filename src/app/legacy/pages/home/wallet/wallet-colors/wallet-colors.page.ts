import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';

import { FILE_TYPES } from '@constants/global';
import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { Wallet } from '@interfaces/wallet.interface';
import { LoadingService } from '@core/services/loading.service';

declare var DropifyPlugin: any;
declare var ModalPlugin: any;

import { WalletColorsService } from './wallet-colors.service';

@Component({
    selector: 'agt-wallet-colors',
    templateUrl: './wallet-colors.page.html',
    styles: [],
    providers: [WalletColorsService],
})
export class WalletColorsPage implements OnInit {
    walletId: string = '';
    themeColors: any[] = [
        { themeId: 1, background: 'bg-azure', preview: 'azure' },
        { themeId: 2, background: 'bg-indigo', preview: 'indigo' },
        { themeId: 3, background: 'bg-red', preview: 'red' },
        { themeId: 4, background: 'bg-orange', preview: 'orange' },
        { themeId: 5, background: 'bg-yellow', preview: 'yellow' },
        { themeId: 6, background: 'bg-lime', preview: 'lime' },
        { themeId: 7, background: 'bg-green', preview: 'green' },
        { themeId: 8, background: 'bg-teal', preview: 'teal' },
        { themeId: 9, background: 'bg-blue-dark', preview: 'blue-dark' },
    ];
    selectedColorName: string = '';
    modalIdConfirmUpdateWallet: string = 'modal-confirm-update-wallet';
    iconsUrl: string = '';
    private _isFormSubmitted: boolean = false;
    private _allowedFileTypes: string[] = ['png', 'jpg', 'jpeg'];

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _router: Router,
        private _walletColorsService: WalletColorsService
    ) {}

    ngOnInit(): void {
        this._catchParams();
        this._loadWallet();
    }

    get model(): WalletColorsService {
        return this._walletColorsService;
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
        const validationClass: string = InputValidatorHelper.getValidationClass(
            control,
            this._isFormSubmitted
        );
        if (constrolName === 'icon') {
            return validationClass === 'is-valid'
                ? 'agt-is-valid'
                : validationClass === 'is-invalid'
                ? 'agt-is-invalid'
                : '';
        }
        return validationClass;
    }

    selectLogo(event: any) {
        if (event.target.files.length > 0) {
            const icon = event.target.files[0];
            this.model.form.patchValue({ icon });
        }
    }

    selectTheme(themeId: number): void {
        this.model.form.patchValue({ themeId });
        this.selectedColorName = this.themeColors[themeId - 1].preview;
        this._paintSelectedCheckbox(themeId);
    }

    confirmUpdateWallet(): void {
        this._isFormSubmitted = true;
        if (this.model.form.valid) {
            ModalPlugin.show(this.modalIdConfirmUpdateWallet);
        }
    }

    updateWallet(): void {
        this._loadingService.show();
        this.model.updateWallet(this.walletId).subscribe(() => {
            this._loadingService.hide();
            AlertHelper.walletUpdated();
        });
    }

    private _catchParams(): void {
        this.walletId = this._activatedRoute.snapshot.params.walletId;
    }

    private _loadWallet(): void {
        this.model.loadWallet().subscribe((wallet: Wallet) => {
            this.iconsUrl = !!wallet.iconsUrl
                ? wallet.iconsUrl + '384x384.png'
                : '';
            this.model.buildForm(wallet);
            this.selectTheme(parseInt(this.model.f.themeId.value));
            setTimeout(() => {
                DropifyPlugin.init(this._allowedFileTypes);
            }, 0);
        });
    }

    private _paintSelectedCheckbox(selectedElement: number): void {
        const totalCheckbox: number = 8;
        for (let i = 0; i < totalCheckbox; i++) {
            const selectedCheckbox: any = document.getElementById(
                'themeColor' + (i + 1)
            );
            if (!!selectedCheckbox) {
                selectedCheckbox.checked = false;
            }
        }
        setTimeout(() => {
            const selectedCheckbox: any = document.getElementById(
                'themeColor' + selectedElement
            );
            if (!!selectedCheckbox) {
                selectedCheckbox.checked = true;
            }
        }, 0);
    }

    private _reloadPage(context: WalletColorsPage): void {
        context._router.routeReuseStrategy.shouldReuseRoute = () => false;
        context._router.onSameUrlNavigation = 'reload';
        context._router.navigate(
            ['/' + ROUTES_NAME.walletResume(context.walletId)],
            { relativeTo: context._activatedRoute }
        );
    }
}
