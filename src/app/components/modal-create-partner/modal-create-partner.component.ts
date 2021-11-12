import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';

import { ERROR_CODES } from '@constants/error-codes';
import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { HttpError } from '@interfaces/http-error.interface';
import { LoadingService } from '@services/loading.service';

import { ModalCreatePartnerService } from './modal-create-partner.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-create-partner',
  templateUrl: './modal-create-partner.component.html',
  styles: [
  ],
  providers: [ModalCreatePartnerService]
})
export class ModalCreatePartnerComponent implements OnInit {
    @Input() modalId: string = '';
    @Output() hasCoincidences: EventEmitter<void> = new EventEmitter<void>();
    private _contentSubtype: string = '';
    private _isFormSubmitted: boolean = false;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _modalCreatePartnerService: ModalCreatePartnerService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this._catchQueryParams();
    }

    get model(): ModalCreatePartnerService {
        return this._modalCreatePartnerService;
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

    createPartner(): void {
        this._isFormSubmitted = true;
        if(this.model.form.valid) {
            this._loadingService.show();
            ModalPlugin.hide(this.modalId);
            this.model.createPartner().subscribe(() => {
                this._reloadPage();
                this._loadingService.hide();
                AlertHelper.partnerCreated();
            }, (error: HttpError) => {
                ModalPlugin.hide(this.modalId);
                switch(error.error) {
                    case ERROR_CODES.partnerHasCoincidences:
                        this.hasCoincidences.emit();
                        break;
                }
            });
        }
    }

    private _catchQueryParams(): void {
        this._activatedRoute.queryParams.subscribe(params => {
            this._contentSubtype = params.contentSubtype || '';
        })
    }

    private _reloadPage(): void {
        this._router.routeReuseStrategy.shouldReuseRoute = () => false;
        this._router.onSameUrlNavigation = 'reload';
        const url: string = this._router.url.split('?')[0] ;
        if(!!this._contentSubtype) {
            this._router.navigate([url], { relativeTo: this._activatedRoute, queryParams: { contentSubtype: this._contentSubtype } } );
        } else {
            this._router.navigate([url], { relativeTo: this._activatedRoute } );
        }
    }

}
