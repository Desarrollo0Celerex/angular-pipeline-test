import { Injectable } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Site } from '@interfaces/site.interface';
import { SiteService } from '@services/site.service';

@Injectable()
export class LogoService {
    form: FormGroup = this._formBuilder.group({});
    isBuiltForm: boolean = false;
    siteThemeName: string = '';

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _siteService: SiteService
    ) { }

    get f(): { [key: string]: AbstractControl; }  {
        return this.form.controls;
    }

    buildForm(): void {
        this.form = this._formBuilder.group({
            logo: ['', [Validators.required]]
        })
        this.isBuiltForm = true;
    }

    loadSite():Observable<Site> {
        const fields: string = 'logoUrl,siteThemeName';
        return this._siteService.getSite(fields).pipe(
            tap((res: Site) => { this.siteThemeName = res.siteThemeName })
        );
    }

    updateSite(): Observable<void> {
        const requestBody: FormData = this._getRequestBody();
        return this._siteService.updateSiteLogo(requestBody);
    }

    private _getRequestBody(): FormData {
        const requestBody: FormData = new FormData();
        requestBody.append('logo', this.f.logo.value);
        return requestBody;
    }
}
