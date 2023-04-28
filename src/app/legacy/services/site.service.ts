import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';
import { Site } from '@interfaces/site.interface';
import { AuthService } from '@services/auth.service';
import { UpdateSiteIdentityDataSend } from '@interfaces/update-site-identity-data-send.interface';
import { SiteTheme } from '@interfaces/site-theme.interface';
import { UpdateSiteThemeDataSend } from '@interfaces/update-site-theme-data-send.interface';

const routes: any = {
    sites: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/sites',
    siteIdentity: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/sites/identity',
    siteLogo: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/sites/logo',
    siteTheme: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/sites/theme',
    siteThemes: environment.apiUrl + '/site-themes',
}

@Injectable()
export class SiteService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) { }

    getSite(fields: string = ''): Observable<Site> {
        const route: string = routes.sites(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if(!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, {params}).pipe(
             map((res: HttpResponse) => {
                 return res.data;
            })
        );
    }

    getSiteThemes(fields: string = ''): Observable<SiteTheme[]> {
        const route: string = routes.siteThemes;
        let params: HttpParams = new HttpParams();
        if(!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, {params}).pipe(
             map((res: HttpResponse) => {
                 return res.data;
            })
        );
    }

    updateSiteIdentity(requestBody: UpdateSiteIdentityDataSend): Observable<void> {
        const route: string = routes.siteIdentity(this._workspaceId);
        return this._httpClient.put<void>(route, requestBody);
    }

    updateSiteLogo(requestBody: FormData): Observable<void> {
        const route: string = routes.siteLogo(this._workspaceId);
        return this._httpClient.post<void>(route, requestBody);
    }

    updateSiteTheme(requestBody: UpdateSiteThemeDataSend): Observable<void> {
        const route: string = routes.siteTheme(this._workspaceId);
        return this._httpClient.post<void>(route, requestBody);
    }
}
