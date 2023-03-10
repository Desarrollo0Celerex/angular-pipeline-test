import { Injectable } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { Site } from '@interfaces/site.interface';
import { SiteTheme } from '@interfaces/site-theme.interface';
import { SiteService } from '@services/site.service';
import { UpdateSiteThemeDataSend } from '@interfaces/update-site-theme-data-send.interface';

@Injectable()
export class ThemeService {
    form: FormGroup = this._formBuilder.group({});
    isBuiltForm: boolean = false;
    selectedColorName: string = '';
    siteThemes: SiteTheme[] = [];

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _siteService: SiteService
    ) { }

    get f(): { [key: string]: AbstractControl; }  {
        return this.form.controls;
    }

    buildForm(site: Site | null = null): void {
        this.form = this._formBuilder.group({
            siteThemeId: [(site !== null && site.siteThemeId !== null) ? site.siteThemeId : '1', [Validators.required]]
        })
        this.isBuiltForm = true;
    }

    loadSite():Observable<Site> {
        const fields: string = 'siteThemeId';
        return this._siteService.getSite(fields);
    }

    loadSiteThemes():Observable<void> {
        const fields: string = 'siteThemeId,name';
        return this._siteService.getSiteThemes(fields).pipe(
            tap((res: SiteTheme[]) => {
                this.siteThemes = res;
            }),
            map(() => { })
        );
    }

    selectTheme(siteThemeId: number): void {
        this.form.patchValue({siteThemeId});
        this.selectedColorName = this.siteThemes[siteThemeId-1].name;
        this._paintSelectedCheckbox(siteThemeId);
    }

    updateSite(): Observable<void> {
        const requestBody: UpdateSiteThemeDataSend = this._getRequestBody();
        return this._siteService.updateSiteTheme(requestBody);
    }

    private _getRequestBody(): UpdateSiteThemeDataSend {
        const requestBody: UpdateSiteThemeDataSend = {
            'siteThemeId': this.f.siteThemeId.value
        };
        return requestBody;
    }

    private _paintSelectedCheckbox(selectedElement: number): void {
        const totalCheckbox: number = 8;
        for(let i=0; i<totalCheckbox; i++) {
            const selectedCheckbox: any = document.getElementById('siteTheme'+(i+1));
            if(!!selectedCheckbox) {
                selectedCheckbox.checked = false;
            }
        }
        setTimeout(() => {
            const selectedCheckbox: any = document.getElementById('siteTheme'+selectedElement);
            if(!!selectedCheckbox) {
                selectedCheckbox.checked = true;
            }
        },0);
    }
}
