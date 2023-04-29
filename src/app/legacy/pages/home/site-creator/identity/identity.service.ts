import { Injectable } from '@angular/core';
import {
    AbstractControl,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { LICENSES, WEB_LINK_LENGTH } from '@constants/global';
import { ValidatorsHelper } from '@helpers/validators.helper';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { Site } from '@interfaces/site.interface';
import { UpdateSiteIdentityDataSend } from '@interfaces/update-site-identity-data-send.interface';
import { SiteService } from '@services/site.service';
import { WorkspaceService } from '@core/services/workspace/workspace.service';
import { Workspace } from '@core/interfaces/workspace.interface';

@Injectable()
export class IdentityService {
    canShowContainerEditDomain: boolean = false;
    canShowContainerShowCertificate: boolean = false;
    form: UntypedFormGroup = this._formBuilder.group({});
    isBuiltForm: boolean = false;
    site: Site | null = null;
    licenseId: number = 0;

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _siteService: SiteService,
        private _workspaceService: WorkspaceService
    ) {}

    get f(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }

    buildForm(site: Site | null = null): void {
        this.form = this._formBuilder.group({
            domain: [
                {
                    value:
                        site !== null && site.domain !== null
                            ? site.domain
                            : '',
                    disabled: true,
                },
                [
                    Validators.required,
                    Validators.minLength(WEB_LINK_LENGTH.MIN),
                    Validators.maxLength(WEB_LINK_LENGTH.MAX),
                    ValidatorsHelper.webLink,
                ],
            ],
            canEditDomain: [
                {
                    value:
                        site !== null && site.canEditDomain === '1'
                            ? true
                            : false,
                    disabled: true,
                },
            ],
            name: [
                site !== null && site.name !== null ? site.name : '',
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(15),
                    ValidatorsHelper.brandName,
                ],
            ],
            description: [
                site !== null && site.description !== null
                    ? site.description
                    : '',
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(148),
                    ValidatorsHelper.brandName,
                ],
            ],
            canShowCertificate: [
                {
                    value:
                        site !== null && site.canShowCertificate === '0'
                            ? false
                            : true,
                    disabled: true,
                },
            ],
        });

        // Update canShowCertificate only if your license allows it
        if (this.licenseId === LICENSES.PRO.ID) {
            this.f.canEditDomain.enable();
            this.f.canShowCertificate.enable();
        }
        this.isBuiltForm = true;
    }

    checkCanShowContainerEditDomain(): void {
        if (this.licenseId < LICENSES.PRO.ID) {
            this.canShowContainerEditDomain = true;
        }
    }

    checkCanShowContainerShowCertificate(): void {
        if (this.licenseId < LICENSES.PRO.ID) {
            this.canShowContainerShowCertificate = true;
        }
    }

    checkDomainInputStatus(): void {
        if (this.f.canEditDomain.value === true) {
            this.f.domain.enable();
        } else {
            this.f.domain.disable();
        }
    }

    loadSite(): Observable<Site> {
        const fields: string =
            'domain,canEditDomain,name,description,siteThemeName,canShowCertificate';
        return this._siteService.getSite(fields).pipe(
            tap((res: Site) => {
                this.site = res;
            })
        );
    }

    loadWorkspaceLicenseId(): Observable<void> {
        const fields: string = 'licenseId';
        return this._workspaceService.getWorkspace(fields).pipe(
            tap((res: Workspace) => {
                this.licenseId = res.licenseId;
            }),
            map(() => {})
        );
    }

    updateSite(): Observable<void> {
        const requestBody: UpdateSiteIdentityDataSend = this._getRequestBody();
        return this._siteService.updateSiteIdentity(requestBody);
    }

    private _getRequestBody(): UpdateSiteIdentityDataSend {
        const requestBody: UpdateSiteIdentityDataSend = {
            domain: this.f.domain.value,
            canEditDomain: this.f.canEditDomain.value === true ? '1' : '0',
            name: this.f.name.value,
            description: this.f.description.value,
            canShowCertificate:
                this.f.canShowCertificate.value === true ? '1' : '0',
        };
        return requestBody;
    }
}
