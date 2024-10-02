import { Component } from '@angular/core';
import { environment } from '@env/environment';

@Component({
    selector: 'agt-inactive-user',
    templateUrl: './inactive-user.page.html',
    styles: [],
})
export class InactiveUserPage {
    onClickExit(): void {
        window.location.href = environment.agenthos.landingUrl;
    }
}
