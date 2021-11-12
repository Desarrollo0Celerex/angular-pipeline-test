import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { OWN_NAME_LENGTH, CLIENT_STATUS } from '@constants/global';
import { UtilitiesHelper } from '@helpers/utilities.helper';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { HttpResponse } from '@interfaces/http-response.interface';
import { ClientService } from '@services/client.service';

@Injectable()
export class ModalSearchClientService {
    form: FormGroup = this._buildForm();

    constructor(
        private _formBuilder: FormBuilder,
        private _clientService: ClientService
    ) { }

    get f(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }

    /**
     * Get the clients
     * @return  The clients
     */
    getClients(): Observable<HttpResponse> {
        const fields: string = 'contactId,contactName,avatarUrl,clientStatusName,clientStatusBackground,contactSourceName,contactScoreName,totalGlobalWallet,totalActivePolicies,currencyName';
        const filters: string = UtilitiesHelper.generateHttpFilter('clientStatusId', [CLIENT_STATUS.OCCASIONAL, CLIENT_STATUS.FREQUENT, CLIENT_STATUS.INFLUENTIAL, CLIENT_STATUS.LOST])
        const page: number = 1;
        const perPage: number = 100;
        const query: string = this.f.name.value;
        return this._clientService.getClients(page, fields, filters, query, perPage);
    }


    private _buildForm(): FormGroup {
        return this._formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(OWN_NAME_LENGTH.MIN), Validators.maxLength(OWN_NAME_LENGTH.MAX), ValidatorsHelper.ownName]]
        });
    }
}
