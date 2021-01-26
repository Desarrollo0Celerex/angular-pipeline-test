import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { InputValidatorHelper } from '@helpers/input-validator.helper';

import { CreateWorkspaceService } from './create-workspace.service';

declare var Select2Plugin: any;

@Component({
  selector: 'agt-create-workspace',
  templateUrl: './create-workspace.page.html',
  styles: [
  ]
})
export class CreateWorkspacePage implements OnInit {
    private _isFormSubmitted: boolean;

    constructor(public createWorkspaceService: CreateWorkspaceService) {
        this._isFormSubmitted = false;
    }

    ngOnInit(): void {
        this._loadCatalogs();
        //Select2Plugin.init();
        //this.createWorkspaceService.loadCountries();
        //this.createWorkspaceService.loadCountryStates(this.createWorkspaceService.f.countryId.value);
    }

    /**
     * Obtiene el nombre de la clase de la validación
     * @param  constrolName Nombre del control a evaluar
     * @return              Nombre de la clase
     */
    getValidationClass(constrolName: string): string {
        const control: AbstractControl | null = this.createWorkspaceService.workspaceForm.get(constrolName);
        return InputValidatorHelper.getValidationClass(control, this._isFormSubmitted);
    }

    /**
     * Obtiene el mensaje de error de un campo
     * @param  constrolName Nombre del control a evaluar
     * @return              Mensaje de error encontrado
     */
    getErrorMessage(constrolName: string): string {
        const control: AbstractControl | null = this.createWorkspaceService.workspaceForm.get(constrolName);
        return InputValidatorHelper.getErrorMessage(control);
    }

    onChangeCountryId(event: any): void {
        this.createWorkspaceService.loadCountryStates(event.target.value);
    }

    onSubmitCreateWorkspace(): void {
        this._isFormSubmitted = true;
        if(this.createWorkspaceService.workspaceForm.valid) {
            console.log('Crear espacio de trabajo')
        } else {
            console.log('Form invalido')
        }
    }

    onPhoneCodeIdSelected(selectedPhoneCodeId: number): void {
        console.log('Código seleccionado: ', selectedPhoneCodeId);
    }

    private _loadCatalogs(): void {
        this.createWorkspaceService.loadCatalogs().subscribe( () => {
            Select2Plugin.init();
        })
    }

}
