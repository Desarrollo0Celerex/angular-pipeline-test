import { Injectable } from '@angular/core';

import { AuthService } from '@features-legacy/auth/services/auth.service';
import { FirebaseDatabaseService } from '@services/firebase-database.service';

declare var ModalPlugin: any;

@Injectable({
    providedIn: 'root',
})
export class FirebaseObservablesService {
    modalIdUserRoleUpdated: string = 'modal-user-role-updated';

    constructor(
        private _authService: AuthService,
        private _firebaseDatabaseService: FirebaseDatabaseService
    ) {}

    /**
     * Inicializa los observadores de firebase
     * @param currentSession Sesión del usuario en Agenthos
     */
    startFirebaseObservables(): void {
        this._observeUserRole(
            this._authService.workspaceId,
            this._authService.userId
        );
    }

    /**
     * Observa el rol del usuario de un espacio de trabajo en firebase
     * @param workspaceId ID del espacio de trabajo
     * @param userId      ID del usuario
     */
    private _observeUserRole(workspaceId: string, userId: string): void {
        this._firebaseDatabaseService
            .getUserRole(workspaceId, userId)
            .subscribe(
                (firebaseValue: number) => {
                    const isUserRoleChanged: boolean =
                        this._checkIsUserRoleChanged(firebaseValue);
                    if (isUserRoleChanged === true) {
                        ModalPlugin.show(this.modalIdUserRoleUpdated);
                    }
                },
                (error: any) => {}
            );
    }

    /**
     * Revisa si el rol del usuario ha sido actualizado
     * @param  firebaseValue ID del rol
     * @return               True si el rol ha cambiado, false en caso contrario
     */
    private _checkIsUserRoleChanged(firebaseValue: number): boolean {
        return firebaseValue != null &&
            firebaseValue != this._authService.roleId
            ? true
            : false;
    }
}
