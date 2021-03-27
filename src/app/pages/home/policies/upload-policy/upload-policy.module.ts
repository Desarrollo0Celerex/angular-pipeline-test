import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ContainerContactDetailsModule } from '@components/container-contact-details/container-contact-details.module';
import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { InsurerService } from '@services/insurer.service';
import { PolicyService } from '@services/policy.service';

import { UploadPolicyRoutingModule } from './upload-policy-routing.module';
import { UploadPolicyPage } from './upload-policy.page';
import { UploadPolicyService } from './upload-policy.service';

@NgModule({
  declarations: [UploadPolicyPage],
  imports: [
    ContainerContactDetailsModule,
    CommonModule,
    FormsModule,
    LoadingContentModule,
    ReactiveFormsModule,
    RouterModule,
    UploadPolicyRoutingModule
  ],
  providers: [InsurerService, PolicyService, UploadPolicyService]
})
export class UploadPolicyModule { }
