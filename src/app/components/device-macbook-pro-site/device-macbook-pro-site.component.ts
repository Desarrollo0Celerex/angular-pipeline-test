import { Component, Input } from '@angular/core';

@Component({
  selector: 'agt-device-macbook-pro-site',
  templateUrl: './device-macbook-pro-site.component.html',
  styles: [
  ]
})
export class DeviceMacbookProSiteComponent {
    @Input() themeName: string = '';

    get backgroundImage(): string {
        const themeName: string = (this.themeName !== '') ? this.themeName : 'azure';
        return 'url("https://webkit.atombits.xyz/agenthos/mockups/agenthos_site_'+themeName+'.png")';
    }
}
