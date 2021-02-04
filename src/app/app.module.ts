import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { BrowserModule } from '@angular/platform-browser';

import { LoadingModule } from '@components/loading/loading.module';
import { environment } from '@env/environment';
import { AUTH_INTERCEPTOR_PROVIDER } from '@interceptors/auth.interceptor';
import { ERROR_INTERCEPTOR_PROVIDER } from '@interceptors/error.interceptor';
import { RoutingHistoryService } from '@services/routing-history.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserModule,
    HttpClientModule,
    LoadingModule
  ],
  providers: [AUTH_INTERCEPTOR_PROVIDER, ERROR_INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private _routingHistoryService: RoutingHistoryService) { }
}
