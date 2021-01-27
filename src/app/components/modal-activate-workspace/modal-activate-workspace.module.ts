import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { QrcodeGoAgenthosShopModule } from '@components/qrcode-go-agenthos-shop/qrcode-go-agenthos-shop.module';

import { ModalActivateWorkspaceComponent } from './modal-activate-workspace.component';
import { ModalActivateWorkspaceService } from './modal-activate-workspace.service'


@NgModule({
  declarations: [ModalActivateWorkspaceComponent],
  exports: [ModalActivateWorkspaceComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QrcodeGoAgenthosShopModule
  ],
  providers: [ModalActivateWorkspaceService]
})
export class ModalActivateWorkspaceModule { }
