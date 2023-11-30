import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyComplementModalComponent } from './components/policy-complement-modal/policy-complement-modal.component';
import { UploadPolicyComplementModalComponent } from './components/upload-policy-complement-modal/upload-policy-complement-modal.component';
import { TotalPolicyComplementsComponent } from './components/total-policy-complements/total-policy-complements.component';
import { PolicyComplementService } from './services/policy-complement.service';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PolicyComplementListComponent } from './components/policy-complement-list/policy-complement-list.component';
import { PolicyComplementCardComponent } from './components/policy-complement-card/policy-complement-card.component';
import { DownloadPolicyComplementModalComponent } from './components/download-policy-complement-modal/download-policy-complement-modal.component';
import { DeletePolicyComplementModalComponent } from './components/delete-policy-complement-modal/delete-policy-complement-modal.component';

@NgModule({
    declarations: [
        PolicyComplementModalComponent,
        UploadPolicyComplementModalComponent,
        TotalPolicyComplementsComponent,
        PolicyComplementListComponent,
        PolicyComplementCardComponent,
        DownloadPolicyComplementModalComponent,
        DeletePolicyComplementModalComponent,
    ],
    exports: [PolicyComplementModalComponent],
    imports: [CommonModule, SharedModule, ReactiveFormsModule],
    providers: [PolicyComplementService],
})
export class PolicyComplementModule {}
