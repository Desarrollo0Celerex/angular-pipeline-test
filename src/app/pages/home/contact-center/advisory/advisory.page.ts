import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { InputValidatorHelper } from '@helpers/input-validator.helper';
import { WorkspaceDirectory } from '@interfaces/workspace-directory.interface';

import { AdvisoryService } from './advisory.service';

@Component({
  selector: 'agt-advisory',
  templateUrl: './advisory.page.html',
  styles: [
  ]
})
export class AdvisoryPage implements OnInit {
    private _isFormSubmitted: boolean = false;

    constructor(public model: AdvisoryService) { }

    ngOnInit(): void {
        this._loadWorkspace();
    }

    getErrorMessage(constrolName: string, index: number): string {
        const control: AbstractControl | null = this.model.directories.at(index).get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    getValidationClass(constrolName: string, index: number): string {
        const control: AbstractControl | null = this.model.directories.at(index).get(constrolName);
        return InputValidatorHelper.getValidationClass(control, this._isFormSubmitted);
    }

    saveDirectories(): void {
        this._isFormSubmitted = true;
        if(this.model.form.valid) {
            console.log('Guardar directorios!');
            
        }
    }

    selectPhoneCodeId(phoneCodeId: number, index: number): void {
        this.model.directories.at(index).patchValue({phoneCodeId})
    }

    selectWhatsappCodeId(whatsappCodeId: number, index: number): void {
        this.model.directories.at(index).patchValue({whatsappCodeId})
    }

    private _loadWorkspace(): void {
        this.model.loadWorkspace().subscribe(() => {
            this.model.loadWorkspaceDirectories().subscribe((directories: WorkspaceDirectory[]) => {
                this.model.buildForm(directories);
            });
        });
    }

}
