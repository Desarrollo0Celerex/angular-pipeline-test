import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';
import { WalletContact } from '@interfaces/wallet-contact.interface';
import { UpdateWalletContactDataSend } from '@interfaces/update-wallet-contact-data-send.interface';
import { AuthService } from '@services/auth.service';

const routes: any = {
    walletContacts: (workspaceId: string, walletId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/wallets/' + walletId + '/wallet-contacts',
}

@Injectable()
export class WalletContactService {
    private _workspaceId: string = this._authService.workspaceId;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) { }

    /**
     * Get the wallet contacts
     * @param  fields    The fields to get
     * @return           The wallet contacts
     */
     getWalletContacts(walletId: string, fields: string = ''): Observable<WalletContact> {
         const route: string = routes.walletContacts(this._workspaceId, walletId);
         let params: HttpParams = new HttpParams();
         if(!!fields) params = params.append('fields', fields);
         return this._httpClient.get<HttpResponse>(route, {params}).pipe(
             map((res: HttpResponse) => {
                 return res.data;
             })
         );
     }

     updateWalletContact(walletId: string, requestBody: UpdateWalletContactDataSend): Observable<void> {
         const route: string = routes.walletContacts(this._workspaceId, walletId);
         return this._httpClient.put<void>(route, requestBody);
     }
}
