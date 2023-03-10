import { Injectable } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ValidatorsHelper } from '@helpers/validators.helper';
import { Site } from '@interfaces/site.interface';
import { UpdateSiteIdentityDataSend } from '@interfaces/update-site-identity-data-send.interface';
import { SiteService } from '@services/site.service';
import { LICENSES } from '@constants/global';

@Injectable()
export class IdentityService {
    form: UntypedFormGroup = this._formBuilder.group({});
    isBuiltForm: boolean = false;
    siteThemeName: string = '';

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _siteService: SiteService
    ) { }

    get f(): { [key: string]: AbstractControl; }  {
        return this.form.controls;
    }

    buildForm(site: Site | null = null): void {
        this.form = this._formBuilder.group({
            name: [(site !== null && site.name !== null) ? site.name : '', [Validators.required, Validators.minLength(3), Validators.maxLength(15), ValidatorsHelper.brandName]],
            canShowCertificate: [{ value: (site !== null && site.canShowCertificate === '0') ? false : true, disabled: true } ]
        })

        // Update canShowCertificate only if your license allows it
        if(site !== null && site.licenseId > LICENSES.LITE) {
            this.f.canShowCertificate.enable();
        }
        this.isBuiltForm = true;
    }

    loadSite():Observable<Site> {
        const fields: string = 'name,siteThemeName,canShowCertificate,licenseId';
        return this._siteService.getSite(fields).pipe(
            tap((res: Site) => { 
                if(res.siteThemeName !== null) {
                    this.siteThemeName = res.siteThemeName
                } 
            })
        );
    }

    updateSite(): Observable<void> {
        const requestBody: UpdateSiteIdentityDataSend = this._getRequestBody();
        return this._siteService.updateSiteIdentity(requestBody);
    }

    private _getRequestBody(): UpdateSiteIdentityDataSend {
        const requestBody: UpdateSiteIdentityDataSend = {
            name: this.f.name.value,
            canShowCertificate: (this.f.canShowCertificate.value === true) ? '1' : '0'
        }
        return requestBody;
    }
}
