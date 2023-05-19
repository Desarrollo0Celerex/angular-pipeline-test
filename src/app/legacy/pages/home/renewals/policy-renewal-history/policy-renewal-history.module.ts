import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertUnusualPolicyIncreaseModule } from '@components/alert-unusual-policy-increase/alert-unusual-policy-increase.module';
import { ChartPolicyTrackerAmountsModule } from '@components/chart-policy-tracker-amounts/chart-policy-tracker-amounts.module';
import { ChartPolicyRenewalsModule } from '@components/chart-policy-renewals/chart-policy-renewals.module';
import { ContainerContactDetailsModule } from '@components/container-contact-details/container-contact-details.module';
import { ContainerPolicyRenewalManagerModule } from '@components/container-policy-renewal-manager/container-policy-renewal-manager.module';
import { ContentListModule } from '@components/content-list/content-list.module';

import { PolicyRenewalHistoryRoutingModule } from './policy-renewal-history-routing.module';
import { PolicyRenewalHistoryPage } from './policy-renewal-history.page';

@NgModule({
  declarations: [
    PolicyRenewalHistoryPage
  ],
  imports: [
    AlertUnusualPolicyIncreaseModule,
    ChartPolicyTrackerAmountsModule,
    ChartPolicyRenewalsModule,
    CommonModule,
    ContainerContactDetailsModule,
    ContainerPolicyRenewalManagerModule,
    ContentListModule,
    PolicyRenewalHistoryRoutingModule
  ]
})
export class PolicyRenewalHistoryModule { }
