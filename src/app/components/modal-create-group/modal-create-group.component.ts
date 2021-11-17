import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { HttpResponse } from '@interfaces/http-response.interface';
import { LoadingService } from '@services/loading.service';

import { ModalCreateGroupService } from './modal-create-group.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-modal-create-group',
  templateUrl: './modal-create-group.component.html',
  styles: [
  ],
  providers: [ModalCreateGroupService]
})
export class ModalCreateGroupComponent implements OnInit {
    @Input() modalId: string = '';
    @Output() hasCoincidences: EventEmitter<string> = new EventEmitter<string>();
    @Output() canCreateGroup: EventEmitter<string> = new EventEmitter<string>();
    private _isFormSubmitted: boolean = false;

    constructor(
        private _loadingService: LoadingService,
        private _modalCreateGroupService: ModalCreateGroupService
    ) { }

    ngOnInit(): void {
        //this._catchQueryParams();
    }

    get model(): ModalCreateGroupService {
        return this._modalCreateGroupService;
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

    checkHasCoincidences(): void {
        this._isFormSubmitted = true;
        if(this.model.form.valid) {
            this._loadingService.show();
            ModalPlugin.hide(this.modalId);
            this.model.checkHasCoincidences().subscribe((res: HttpResponse) => {
                this._loadingService.hide();
                if(res.data == true) {
                    this.hasCoincidences.emit(this.model.f.name.value);
                } else {
                    this.canCreateGroup.emit(this.model.f.name.value);
                }
                this._resetForm();
            });
        }
    }

    closeModal(): void {
        ModalPlugin.hide(this.modalId);
        this._resetForm();
    }

    /**
     * Reset the form
     */
    private _resetForm(): void {
        this._isFormSubmitted = false;
        this.model.form.reset();
    }

    /*createGroup(): void {
        this._isFormSubmitted = true;
        if(this.model.form.valid) {
            this._loadingService.show();
            ModalPlugin.hide(this.modalId);
            this.model.createGroup().subscribe(() => {
                this._reloadPage();
                this._loadingService.hide();
                AlertHelper.groupCreated();
            }, (error: HttpError) => {
                ModalPlugin.hide(this.modalId);
                switch(error.error) {
                    case ERROR_CODES.groupHasCoincidences:
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
    }*/

}
