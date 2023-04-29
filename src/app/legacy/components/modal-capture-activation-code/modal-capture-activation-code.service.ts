import { Injectable } from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';

import { ValidatorsHelper } from '@helpers/validators.helper';
import { HttpResponse } from '@core/interfaces/http-response.interface';
import { UserTokenData } from '@core/interfaces/user-token-data.interface';
import { AuthService } from '@core/services/auth/auth.service';
import { FirebaseService } from '@core/services/firebase/firebase.service';
import { WorkspaceService } from '@core/services/workspace/workspace.service';

@Injectable()
export class ModalCaptureActivationCodeService {
    form: UntypedFormGroup;

    constructor(
        private _authService: AuthService,
        private _firebaseService: FirebaseService,
        private _formBuilder: UntypedFormBuilder,
        private _workspaceService: WorkspaceService
    ) {
        this.form = this._buildLicenseForm();
    }

    activateWorkspace(activationCode: string): Observable<string> {
        return this._workspaceService.activateWorkspace(activationCode);
    }

    getFirebaseToken(workspaceId: string, userId: string): Observable<string> {
        return this._firebaseService.getFirebaseToken(workspaceId, userId);
    }

    logout(): void {
        this._authService.logout();
    }

    startSessionInAgenthos(userToken: string): UserTokenData {
        return this._authService.startSessionInAgenthos(userToken);
    }

    startSessionInFirebase(firebaseToken: string): Promise<any> {
        return this._firebaseService.startSessionInFirebase(firebaseToken);
    }

    private _buildLicenseForm(): UntypedFormGroup {
        return this._formBuilder.group({
            activationCode: [
                '',
                [Validators.required, ValidatorsHelper.activationCode],
            ],
        });
    }
}
