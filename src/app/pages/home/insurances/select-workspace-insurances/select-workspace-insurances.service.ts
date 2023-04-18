import { Injectable } from '@angular/core';
import { HttpResponse } from '@interfaces/http-response.interface';
import { Insurance } from '@interfaces/insurance.interface';
import { LicenseInsurance } from '@interfaces/license-insurance.interface';
import { LicenseInsurances } from '@interfaces/license-insurances.interface';
import { License } from '@interfaces/license.interface';

import { InsuranceService } from '@services/insurance.service';
import { LicenseService } from '@services/license.service';
import { WorkspaceService } from '@services/workspace.service';
import { WorkspaceInsuranceService } from '@services/workspace-insurance.service';
import { Observable, forkJoin } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class SelectWorkspaceInsurancesService {
    contentLoaded: boolean = false;
    licenseInsurances: LicenseInsurances[] = [];
    licenses: License[] = [];
    workspaceInsurances: Insurance[] = [];
    workspaceLicenseId: number = 0;

    constructor(
        private _insuranceService: InsuranceService,
        private _licenseService: LicenseService,
        private _workspaceService: WorkspaceService,
        private _workspaceInsuranceService: WorkspaceInsuranceService,
    ) { }

    addWorkspaceInsurance(insuranceId: number): Observable<void> {
        return this._workspaceInsuranceService.addWorkspaceInsurance(insuranceId);
    }

    loadLicenses(): Observable<void> {
        const fields: string = 'licenseId,shortName';
        return this._licenseService.getLicenses(fields).pipe(
            tap((res: License[]) => { 
                this.licenses = res;
            }),
            map(() => { })
        );
    }

    loadLicenseInsurances(): void {
        this.licenseInsurances = [];
        this._getRequestToGetLicensesInsurances().subscribe( (res: HttpResponse[]) => {
            this._loadLicenseInsurances(res);
            this._compareInsurances();
            this.contentLoaded = true;
        });
    }

    loadWorkspaceInsurances(): Observable<void> {
        const fields: string = 'insuranceId';
        return this._workspaceInsuranceService.getWorkspaceInsurances(fields).pipe(
            tap((res: Insurance[]) => {
                this.workspaceInsurances = res;
            }),
            map(() => { })
        )
    }

    loadWorkspaceLicenseId(): Observable<void> {
        const fields: string = 'licenseId';
        return this._workspaceService.getWorkspace(fields).pipe(
            tap((res: HttpResponse) => {
                this.workspaceLicenseId = res.data.licenseId;
            }),
            map(() => { })
        )
    }

    removeWorkspaceInsurance(insuranceId: number): Observable<void> {
        return this._workspaceInsuranceService.removeWorkspaceInsurance(insuranceId);
    }

    private _compareInsurances(): void {
        for(let indexLicense in this.licenseInsurances) {
            for(let indexInsurance in this.licenseInsurances[indexLicense].insurances) {
                for (let workspaceInsurance of this.workspaceInsurances) {
                    if(this.licenseInsurances[indexLicense].insurances[indexInsurance].insuranceId === workspaceInsurance.insuranceId) {
                        this.licenseInsurances[indexLicense].insurances[indexInsurance].hasActiveLeadGenerator = true;
                    } else if(typeof this.licenseInsurances[indexLicense].insurances[indexInsurance].hasActiveLeadGenerator == 'undefined') {
                        this.licenseInsurances[indexLicense].insurances[indexInsurance].hasActiveLeadGenerator = false;
                    }
                }
            } 
        }
    }

    private _getRequestToGetLicensesInsurances(): Observable<HttpResponse[]> {
        let requests: Observable<HttpResponse>[] = [];
        const fields: string = 'insuranceId,name,title,description,background,icon';
        const sortBy: string = 'licenseSorting';
        for(let license of this.licenses) {
            let request: Observable<HttpResponse> = this._insuranceService.getLicenseInsurances(license.licenseId, fields, sortBy);
            requests.push(request);
        }
        return forkJoin(requests);
    }

    private _loadLicenseInsurances(res: HttpResponse[]): void {
        for(let index in this.licenses) {
            const license: License = this.licenses[index];
            const licenseInsurances: LicenseInsurance[] = res[index].data;
            this.licenseInsurances.push({
                ...license,
                insurances: licenseInsurances
            });
        }
    }
}
