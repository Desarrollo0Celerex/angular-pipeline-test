import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { HttpService } from '@core/services/http.service';

const ENDPOINTS = {
    firebaseToken: (workspaceId: string, userId: string) =>
        `${environment.apiUrl}/workspaces/${workspaceId}/users/${userId}/firebase-token`,
};

@Injectable()
export class FirebaseService {
    constructor(
        private _angularFireAuth: AngularFireAuth,
        private _httpService: HttpService
    ) {}

    getFirebaseToken(workspaceId: string, userId: string): Observable<string> {
        const route: string = ENDPOINTS.firebaseToken(workspaceId, userId);
        return this._httpService.get(route);
    }

    startSessionInFirebase(firebaseToken: string): Promise<any> {
        return this._angularFireAuth.signInWithCustomToken(firebaseToken);
    }

    exitFirebase(): void {
        this._angularFireAuth.signOut();
    }
}
