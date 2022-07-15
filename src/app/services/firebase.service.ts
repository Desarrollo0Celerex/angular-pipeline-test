import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpResponse } from '@interfaces/http-response.interface';

const ROUTES = {
    firebaseToken: (workspaceId: string, userId: string) => `${environment.apiUrl}/workspaces/${workspaceId}/users/${userId}/firebase-token`
}

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {

    constructor(
        private _angularFireAuth: AngularFireAuth,
        private _httpClient: HttpClient
    ) { }

    /**
     * Get the firebase token from API
     * @param  workspaceId Workspace id
     * @param  userId      User id
     * @return             Firebase token
     */
    getFirebaseToken(workspaceId: string, userId: string): Observable<HttpResponse> {
        const route: string = ROUTES.firebaseToken(workspaceId, userId);
        return this._httpClient.get<HttpResponse>(route);
    }

    /**
     * Login to firebase
     * @param firebaseToken Firebase token
     * @return              User credential
     */
    startSessionInFirebase(firebaseToken: string): Promise<any> {
        return this._angularFireAuth.signInWithCustomToken(firebaseToken);
    }

    /**
     * Exit firebase
     */
    exitFirebase(): void {
        this._angularFireAuth.signOut();
    }
}
