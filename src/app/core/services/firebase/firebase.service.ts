import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

import { AuthHttp } from '@core/http/auth/auth.http';

@Injectable({
    providedIn: 'root',
})
export class FirebaseService {
    constructor(
        private _angularFireAuth: AngularFireAuth,
        private _authHttp: AuthHttp
    ) {}

    getFirebaseToken(workspaceId: string, userId: string): Observable<string> {
        return this._authHttp.getFirebaseToken(workspaceId, userId);
    }

    startSessionInFirebase(firebaseToken: string): Promise<any> {
        return this._angularFireAuth.signInWithCustomToken(firebaseToken);
    }

    exitFirebase(): void {
        this._angularFireAuth.signOut();
    }
}
