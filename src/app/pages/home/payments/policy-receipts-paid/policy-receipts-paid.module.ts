import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertUnusualLatePaymentsModule } from '@components/alert-unusual-late-payments/alert-unusual-late-payments.module';
import { ChartPolicyPaymentsModule } from '@components/chart-policy-payments/chart-policy-payments.module';
import { ChartPolicyPaymentsBehaviorModule } from '@components/chart-policy-payments-behavior/chart-policy-payments-behavior.module';
import { ContainerContactDetailsModule } from '@components/container-contact-details/container-contact-details.module';
import { ContainerPaymentsManagerModule } from '@components/container-payments-manager/container-payments-manager.module';
import { ContentListModule } from '@components/content-list/content-list.module';

import { PolicyReceiptsPaidRoutingModule } from './policy-receipts-paid-routing.module';
import { PolicyReceiptsPaidPage } from './policy-receipts-paid.page';

@NgModule({
  declarations: [
    PolicyReceiptsPaidPage
  ],
  imports: [
    AlertUnusualLatePaymentsModule,
    ChartPolicyPaymentsModule,
    ChartPolicyPaymentsBehaviorModule,
    CommonModule,
    PolicyReceiptsPaidRoutingModule,
    ContainerContactDetailsModule,
    ContainerPaymentsManagerModule,
    ContentListModule
  ]
})
export class PolicyReceiptsPaidModule { }
