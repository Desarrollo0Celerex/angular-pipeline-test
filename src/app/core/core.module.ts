import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from '@core/services/auth/auth.service';
import { FirebaseService } from '@core/services/firebase/firebase.service';
import { ApiHttp } from '@core/http/api.http';
import { AuthHttp } from '@core/http/auth/auth.http';
import { JwtService } from '@core/services/jwt/jwt.service';
import { LoadingService } from '@core/services/loading/loading.service';
import { RoutingHistoryService } from '@core/services/routing-history/routing-history.service';
import { StorageService } from '@core/services/storage/storage.service';

@NgModule({
    declarations: [],
    imports: [CommonModule, HttpClientModule],
    providers: [
        ApiHttp,
        AuthHttp,
        AuthService,
        FirebaseService,
        JwtService,
        LoadingService,
        RoutingHistoryService,
        StorageService,
    ],
})
export class CoreModule {}
