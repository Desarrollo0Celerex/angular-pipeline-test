import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { AlertHelper } from '@helpers/alert.helper';
import { Sinister } from '@interfaces/sinister.interface';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { SinisterDataSend } from '@interfaces/sinister-data-send.interface';
import { LoadingService } from '@services/loading.service';

import { ModalUpdateSinisterDetailsService } from './modal-update-sinister-details.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-update-sinister-details',
  templateUrl: './modal-update-sinister-details.component.html',
  styles: [
  ],
  providers: [ModalUpdateSinisterDetailsService]
})
export class ModalUpdateSinisterDetailsComponent implements OnInit {
    @Input() modalId: string = '';
    @Input() sinisterData: SinisterDataSend | null = null;
    calendarIdSinisterDate: string = 'sinisterDate';
    calendarIdEstimatedResolutionDate: string = 'estimatedResolutionDate';
    private _isFormSubmitted: boolean = false;

    constructor(
        public model: ModalUpdateSinisterDetailsService,
        private _activatedRoute: ActivatedRoute,
        private _loadingService: LoadingService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this._loadSinister();
    }

    /**
     * Get the error message
     * @param  constrolName Control name
     * @return              Error message
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.model.sinisterDetailsForm.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    /**
     * Get the validation class
     * @param  constrolName Control name
     * @return              Validation class
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.model.sinisterDetailsForm.get(constrolName);
        return InputValidatorHelper.getValidationClass(control, this._isFormSubmitted);
    }

    /**
     * Submit event to update the sinister
     */
    onSubmitUpdateSinister(): void {
        this._isFormSubmitted = true;
        if(this.model.sinisterDetailsForm.valid && !!this.sinisterData) {
            this._loadingService.show();
            ModalPlugin.hide(this.modalId);
            this.model.updateSinister(this.sinisterData).subscribe(() => {
                this._loadingService.hide();
                AlertHelper.sinisterUpdated(this._reloadPage, this)
            });
        }
    }

    /**
     * Reload the page
     * @param context The app context
     */
    private _reloadPage(context: ModalUpdateSinisterDetailsComponent): void {
        context._router.routeReuseStrategy.shouldReuseRoute = () => false;
        context._router.onSameUrlNavigation = 'reload';
        if(!!context.sinisterData) {
            context._router.navigate(['/' + ROUTES_NAME.showSinisterHistory(context.sinisterData.contactId, context.sinisterData.policyId, context.sinisterData.sinisterId)], { relativeTo: context._activatedRoute });
        }
    }

    /**
     * Load the sinister
     */
    private _loadSinister(): void {
        if(this.sinisterData) {
            this.model.loadSinister(this.sinisterData).subscribe( (res: Sinister) => {
                this.model.fillSinisterForm(res);
                this.model.loadSinisterTypes(res.insuranceId);
            })
        }
    }
}
