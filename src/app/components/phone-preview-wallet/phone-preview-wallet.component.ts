import { Component, Input } from '@angular/core';

@Component({
  selector: 'agt-phone-preview-wallet',
  templateUrl: './phone-preview-wallet.component.html',
  styles: [
  ]
})
export class PhonePreviewWalletComponent {
    @Input() themeName: string = '';

    get backgroundImage(): string {
        return 'url("https://webkit.atombits.xyz/agenthos/mockups/agenthos_wallet_'+this.themeName+'.png")';
    }
}
