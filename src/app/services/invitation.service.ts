import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { INVITATION_STATUS } from '@constants/global';
import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';
import { CreateInvitationDataSend } from '@interfaces/create-invitation-data-send.interface';
import { AuthService } from '@services/auth.service';

const routes: any = {
    invitation: (workspaceId: string, invitationId: number) => environment.apiUrl + '/workspaces/' + workspaceId + '/invitations/' + invitationId,
    invitations: (workspaceId: string) => environment.apiUrl + '/workspaces/' + workspaceId + '/invitations'
}

@Injectable()
export class InvitationService {
    private _workspaceId: string;

    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) {
        this._workspaceId = this._authService.workspaceId;
    }

    /**
     * Create an invitation in the API
     * @param  requestBody Request body
     * @return             Invitation
     */
    createInvitation(requestBody: CreateInvitationDataSend): Observable<HttpResponse> {
        const route: string = routes.invitations(this._workspaceId);
        return this._httpClient.post<HttpResponse>(route, requestBody);
    }

    /**
     * Delete an invitation from the DB
     * @param  invitationId The invitation ID to delete
     * @return              Notice of action done
     */
    deleteInvitation(invitationId: number): Observable<void> {
        const route: string = routes.invitation(this._workspaceId, invitationId);
        return this._httpClient.delete<void>(route);
    }

    /**
     * Get the invitations from the API
     * @param  fields             Fields
     * @param  invitationStatusId Invitation status id
     * @return                    Invitations
     */
    getInvitations(fields: string = '', invitationStatusId: string = ''): Observable<HttpResponse> {
        const route: string = routes.invitations(this._workspaceId);
        let params: HttpParams = new HttpParams();
        params = params.append('fields', fields);
        params = params.append('filter', 'invitationStatusId[=]' + invitationStatusId);
        return this._httpClient.get<HttpResponse>(route, {params});
    }

    /**
     * Send an invitation from the API
     * @param  invitationId Invitation Id
     * @return              Sent invitation notification
     */
    sendInvitation(invitationId: number): Observable<void> {
        const route: string = routes.invitation(this._workspaceId, invitationId);
        return this._httpClient.post<void>(route, null);
    }
}
