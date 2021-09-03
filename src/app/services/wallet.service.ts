import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';
import { Wallet } from '@interfaces/wallet.interface';
import { AuthService } from '@services/auth.service';

const routes: any = {
    walletId: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/wallet-id',
    wallets: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/wallets',
}

@Injectable()
export class WalletService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) { }

    createWallet(): Observable<string> {
        const route: string = routes.wallets(this._workspaceId);
        return this._httpClient.post<HttpResponse>(route, null).pipe(
            map((res: HttpResponse) => {
                return res.data;
            })
        );
    }

    /**
     * Get the wallet ID
     * @return The wallet ID
     */
     getWalletId(): Observable<string> {
         const route: string = routes.walletId(this._workspaceId);
         return this._httpClient.get<HttpResponse>(route).pipe(
             map((res: HttpResponse) => {
                 return res.data;
             })
         );
     }

    /**
     * Get the wallet contacts
     * @param  fields    The fields to get
     * @return           The wallet contacts
     */
     getWallet(fields: string = ''): Observable<Wallet> {
         const route: string = routes.wallets(this._workspaceId);
         let params: HttpParams = new HttpParams();
         if(!!fields) params = params.append('fields', fields);
         return this._httpClient.get<HttpResponse>(route, {params}).pipe(
             map((res: HttpResponse) => {
                 return res.data;
             })
         );
     }
}
