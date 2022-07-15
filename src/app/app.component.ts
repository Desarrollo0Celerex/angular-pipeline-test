import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { FirebaseObservablesService } from '@services/firebase-observables.service';

@Component({
  selector: 'agt-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {

    constructor(
        private _angularFireAuth: AngularFireAuth,
        private firebaseObservablesService: FirebaseObservablesService
    ) { }

    /**
     * Detecta si el usuario tiene una sesión de usuario iniciada en firebase,
     * en caso de éxito, inicia los observadores
     */
    ngOnInit(): void {
        this._angularFireAuth.onAuthStateChanged( (user: any) => {
            if(user !== null) {
                this.firebaseObservablesService.startFirebaseObservables();
            }
        })
    }
}
