import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '@features/auth/services/auth.service';

@Directive({
    selector: '[agtRole]',
})
export class RoleDirective {
    @Input() set agtRole(role: number) {
        if (this._authService.roleId !== role) {
            this._viewContainer.createEmbeddedView(this._templateRef);
        } else {
            this._viewContainer.clear();
        }
    }

    constructor(
        private _templateRef: TemplateRef<any>,
        private _viewContainer: ViewContainerRef,
        private _authService: AuthService
    ) {}
}
