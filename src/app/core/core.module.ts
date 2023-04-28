import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from '@core/services/auth.service';
import { FirebaseService } from '@core/services/firebase.service';
import { HttpService } from '@core/services/http.service';
import { JwtService } from '@core/services/jwt.service';
import { LoadingService } from '@core/services/loading.service';
import { RoutingHistoryService } from '@core/services/routing-history.service';
import { StorageService } from '@core/services/storage.service';

@NgModule({
    declarations: [],
    imports: [CommonModule, HttpClientModule],
    providers: [
        AuthService,
        FirebaseService,
        HttpService,
        JwtService,
        LoadingService,
        RoutingHistoryService,
        StorageService,
    ],
})
export class CoreModule {}
