import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { BrowserModule } from '@angular/platform-browser';

import { LoadingModule } from '@components/loading/loading.module';
import { ModalVoiceControlContactResultsModule } from '@components/modal-voice-control-contact-results/modal-voice-control-contact-results.module';
import { ModalVoiceControlTalkingModule } from '@components/modal-voice-control-talking/modal-voice-control-talking.module';
import { ModalVoiceControlProcessingRequestModule } from '@components/modal-voice-control-processing-request/modal-voice-control-processing-request.module';
import { ModalVoiceControlNotSupportedModule } from '@components/modal-voice-control-not-supported/modal-voice-control-not-supported.module';
import { ModalVoiceControlCommandNotFoundModule } from '@components/modal-voice-control-command-not-found/modal-voice-control-command-not-found.module';
import { ModalVoiceControlNoResultsModule } from '@components/modal-voice-control-no-results/modal-voice-control-no-results.module';
import { ScanningModule } from '@components/scanning/scanning.module';
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
    LoadingModule,
    ModalVoiceControlContactResultsModule,
    ModalVoiceControlTalkingModule,
    ModalVoiceControlProcessingRequestModule,
    ModalVoiceControlNotSupportedModule,
    ModalVoiceControlCommandNotFoundModule,
    ModalVoiceControlNoResultsModule,
    ScanningModule
  ],
  providers: [AUTH_INTERCEPTOR_PROVIDER, ERROR_INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private _routingHistoryService: RoutingHistoryService) { }
}
