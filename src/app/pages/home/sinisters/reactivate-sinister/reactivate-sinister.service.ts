import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ValidatorsHelper } from '@helpers/validators.helper';
import { HttpResponse } from '@interfaces/http-response.interface';
import { Sinister } from '@interfaces/sinister.interface';
import { SinisterDataSend } from '@interfaces/sinister-data-send.interface';
import { SinisterReactivation } from '@interfaces/sinister-reactivation.interface';
import { SinisterService } from '@services/sinister.service';
import { SinisterReactivationService } from '@services/sinister-reactivation.service';

@Injectable()
export class ReactivateSinisterService {
    sinister: Sinister | null = null;
    sinisterReactivations: SinisterReactivation[] = [];
    sinisterForm: FormGroup = this._buildSinisterForm();

    constructor(
        private _formBuilder: FormBuilder,
        private _sinisterService: SinisterService,
        private _sinisterReactivationService: SinisterReactivationService,
    ) { }

    get f(): { [key: string]: AbstractControl } {
        return this.sinisterForm.controls;
    }

    /**
    * Load the sinister data
    * @param sinisterData The sinister data
    * @return             Notification of action done
    */
   loadSinister(sinisterData: SinisterDataSend): Observable<void> {
       const fields: string = 'coveredProperty,policyNumber,clientNumber,insurerName,sinisterDate,sinisterNumber,invoice,certificate';
       return this._sinisterService.getPolicySinister(sinisterData.contactId, sinisterData.policyId, sinisterData.sinisterId, fields).pipe(
           tap((res: HttpResponse) => {
               this.sinister = res.data;
           }),
           map(() => { })
       )
   }

   /**
    * Load the sinister reactivations
    */
   loadSinisterReactivations(): void {
       const fields: string = 'sinisterReactivationId,name';
       this._sinisterReactivationService.getSinisterReactivations(fields).subscribe((res: HttpResponse) => {
           this.sinisterReactivations = res.data;
       });
   }

   /**
    * Reactivate the sinister
    * @param  sinisterData The sinister data
    * @return              Notification of action done
    */
   reactivateSinister(sinisterData: SinisterDataSend): Observable<void> {
       const requestBody: FormData = this._getRequestBody();
       return this._sinisterService.reactivateSinister(sinisterData.contactId, sinisterData.policyId, sinisterData.sinisterId, requestBody);
   }

   /**
    * Build the sinister form
    * @return The sinister form
    */
   private _buildSinisterForm(): FormGroup {
       return this._formBuilder.group({
           evidenceFile: [''],
           sinisterReactivationId: ['', [Validators.required]],
           reactivationDate: ['', [Validators.required, ValidatorsHelper.date]]
       });
   }

   /**
    * Get the request body
    * @return The request body
    */
   private _getRequestBody(): FormData {
       const requestBody: FormData = new FormData();
       requestBody.append('evidenceFile', this.f.evidenceFile.value);
       requestBody.append('sinisterReactivationId', this.f.sinisterReactivationId.value);
       requestBody.append('reactivationDate', this.f.reactivationDate.value);
       return requestBody;
   }

}
