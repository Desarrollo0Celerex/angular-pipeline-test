import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
    providedIn: 'root',
})
export class FirebaseService {
    constructor(private _angularFireAuth: AngularFireAuth) {}

    startSessionInFirebase(firebaseToken: string): Promise<any> {
        return this._angularFireAuth.signInWithCustomToken(firebaseToken);
    }

    exitFirebase(): void {
        this._angularFireAuth.signOut();
    }
}
