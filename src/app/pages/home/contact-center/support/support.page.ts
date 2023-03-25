import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ROUTES_NAME } from '@constants/routes-name';

import { AlertHelper } from '@helpers/alert.helper';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { WorkspaceDirectory } from '@interfaces/workspace-directory.interface';

import { SupportService } from './support.service';

declare var ModalPlugin: any;

@Component({
  selector: 'agt-support',
  templateUrl: './support.page.html',
  styles: [
  ],
  providers: [SupportService]
})
export class SupportPage implements OnInit {
    modalIdConfirmSaveWorkspaceDirectories: string = 'agt-modal-confirm-save-workspace-directories';
    private _isFormSubmitted: boolean = false;

    constructor(
        public model: SupportService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this._loadWorkspace();
    }

    getErrorMessage(constrolName: string, index: number): string {
        const control: AbstractControl | null = this.model.workspaceDirectories.at(index).get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    getValidationClass(constrolName: string, index: number): string {
        const control: AbstractControl | null = this.model.workspaceDirectories.at(index).get(constrolName);
        return InputValidatorHelper.getValidationClass(control, this._isFormSubmitted);
    }

    validateForm(): void {
        this._isFormSubmitted = true;
        if(this.model.form.valid) {
            ModalPlugin.show(this.modalIdConfirmSaveWorkspaceDirectories);
        }
    }

    saveWorkspaceDirectories(): void {
        this.model.saveWorkspaceDirectories().subscribe(() => {
            AlertHelper.workspaceDirectoriesSaved();
            this.goToContactCenterResume();
        });
    }

    selectPhoneCodeId(phoneCodeId: number, index: number): void {
        this.model.workspaceDirectories.at(index).patchValue({phoneCodeId})
    }

    selectWhatsappCodeId(whatsappCodeId: number, index: number): void {
        this.model.workspaceDirectories.at(index).patchValue({whatsappCodeId})
    }

    private _loadWorkspace(): void {
        this.model.loadWorkspace().subscribe(() => {
            this.model.loadWorkspaceDirectories().subscribe((workspaceDirectories: WorkspaceDirectory[]) => {
                this.model.buildForm(workspaceDirectories);
            });
        });
    }

    private goToContactCenterResume(): void {
        this._router.navigateByUrl(ROUTES_NAME.contactCenterResume);
    }
}
