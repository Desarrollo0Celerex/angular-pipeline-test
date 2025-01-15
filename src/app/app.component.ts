import { Component, Renderer2 } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ThemeService } from '@core/services/theme/theme.service';

import { FirebaseObservablesService } from '@services/firebase-observables.service';

@Component({
    selector: 'agt-root',
    templateUrl: './app.component.html',
    styles: [],
    standalone: false
})
export class AppComponent {
    constructor(
        private _angularFireAuth: AngularFireAuth,
        private _renderer2: Renderer2,
        private _themeService: ThemeService,
        private _firebaseObservablesService: FirebaseObservablesService
    ) {}

    ngOnInit(): void {
        this._initializeTheme();
        this._initializeAuth();
    }

    /**
     * Detecta si el usuario tiene una sesión de usuario iniciada en firebase,
     * en caso de éxito, inicia los observadores
     */
    private _initializeAuth(): void {
        this._angularFireAuth.onAuthStateChanged((user: any) => {
            if (user !== null) {
                this._firebaseObservablesService.startFirebaseObservables();
            }
        });
    }

    private _initializeTheme(): void {
        this._themeService.setTheme(this._renderer2);
    }
}
