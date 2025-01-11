import { Component, Input } from '@angular/core';

@Component({
    selector: 'agt-device-iphone',
    templateUrl: './device-iphone.component.html',
    styles: [],
    standalone: false
})
export class DeviceIphoneComponent {
    @Input() themeName: string = '';

    get backgroundImage(): string {
        return 'url("https://webkit.atombits.xyz/agenthos/mockups/agenthos_wallet_'+this.themeName+'.png")';
    }
}
