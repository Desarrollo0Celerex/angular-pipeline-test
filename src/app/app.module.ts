import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { BrowserModule } from '@angular/platform-browser';

import { CoreModule } from '@core/core.module';

import { LoadingModule } from '@components/loading/loading.module';
import { ModalUserRoleUpdatedModule } from '@components/modal-user-role-updated/modal-user-role-updated.module';
import { ModalSessionExpiredModule } from '@components/modal-session-expired/modal-session-expired.module';
import { ModalWorkspaceUserNotFoundModule } from '@components/modal-workspace-user-not-found/modal-workspace-user-not-found.module';
import { ScanningModule } from '@components/scanning/scanning.module';
import { environment } from '@env/environment';
import { AUTH_INTERCEPTOR_PROVIDER } from '@interceptors/auth.interceptor';
import { ERROR_INTERCEPTOR_PROVIDER } from '@interceptors/error.interceptor';
import { MANAGE_HTTP_INTERCEPTOR_PROVIDER } from '@interceptors/manage-http.interceptor';
import { RoutingHistoryService } from '@core/services/routing-history/routing-history.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        BrowserModule,
        CoreModule,
        LoadingModule,
        ModalUserRoleUpdatedModule,
        ModalSessionExpiredModule,
        ModalWorkspaceUserNotFoundModule,
        ScanningModule,
    ],
    providers: [
        AUTH_INTERCEPTOR_PROVIDER,
        ERROR_INTERCEPTOR_PROVIDER,
        MANAGE_HTTP_INTERCEPTOR_PROVIDER,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(private _routingHistoryService: RoutingHistoryService) {}
}
