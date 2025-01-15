import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@features-legacy/auth/services/auth.service';

@Component({
    selector: 'agt-check-accept-invitation',
    template: '',
    styles: [],
    standalone: false
})
export class CheckAcceptInvitationPage implements OnInit {
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService
    ) {}

    ngOnInit(): void {
        const invitationToken =
            this._activatedRoute.snapshot.params.invitationToken;
        this._authService.logout(
            true,
            '/invitations/accept-invitation/' + invitationToken
        );
    }
}
