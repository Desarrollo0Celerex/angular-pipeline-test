import { Component, Input } from '@angular/core';

@Component({
    selector: 'agt-device-macbook-pro',
    templateUrl: './device-macbook-pro.component.html',
    styles: [],
    standalone: false
})
export class DeviceMacbookProComponent {
    @Input() themeName: string = '';

    get backgroundImage(): string {
        const themeName: string = (this.themeName !== '') ? this.themeName : 'azure';
        return 'url("https://webkit.atombits.xyz/agenthos/mockups/agenthos_site_'+themeName+'.png")';
    }
}
