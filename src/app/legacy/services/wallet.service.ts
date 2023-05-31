import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { UpdateWalletIdentityDataSend } from '@interfaces/update-wallet-identity-data-send.interface';
import { Wallet } from '@interfaces/wallet.interface';
import { WalletTheme } from '@interfaces/wallet-theme.interface';
import { AuthService } from '@features/auth/services/auth.service';

const routes: any = {
    wallets: (workspaceId: string) =>
        environment.apiUrl + '/workspaces/' + workspaceId + '/wallets',
    walletIdentity: (workspaceId: string) =>
        environment.apiUrl + '/workspaces/' + workspaceId + '/wallets/identity',
    walletIcon: (workspaceId: string) =>
        environment.apiUrl + '/workspaces/' + workspaceId + '/wallets/icon',
    walletTheme: (workspaceId: string) =>
        environment.apiUrl + '/workspaces/' + workspaceId + '/wallets/theme',
    walletThemes: environment.apiUrl + '/wallet-themes',
};

@Injectable()
export class WalletService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) {}

    createWallet(): Observable<string> {
        const route: string = routes.wallets(this._workspaceId);
        return this._httpClient.post<HttpResponse>(route, null).pipe(
            map((res: HttpResponse) => {
                return res.data;
            })
        );
    }

    getWallet(fields: string = ''): Observable<Wallet> {
        const route: string = routes.wallets(this._workspaceId);
        let params: HttpParams = new HttpParams();
        if (!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => {
                return res.data;
            })
        );
    }

    getWalletThemes(fields: string = ''): Observable<WalletTheme[]> {
        const route: string = routes.walletThemes;
        let params: HttpParams = new HttpParams();
        if (!!fields) params = params.append('fields', fields);
        return this._httpClient.get<HttpResponse>(route, { params }).pipe(
            map((res: HttpResponse) => {
                return res.data;
            })
        );
    }

    updateWalletIdentity(
        requestBody: UpdateWalletIdentityDataSend
    ): Observable<void> {
        const route: string = routes.walletIdentity(this._workspaceId);
        return this._httpClient.put<void>(route, requestBody);
    }

    updateWalletIcon(requestBody: FormData): Observable<void> {
        const route: string = routes.walletIcon(this._workspaceId);
        return this._httpClient.post<void>(route, requestBody);
    }

    updateWalletTheme(requestBody: FormData): Observable<void> {
        const route: string = routes.walletTheme(this._workspaceId);
        return this._httpClient.post<void>(route, requestBody);
    }
}
