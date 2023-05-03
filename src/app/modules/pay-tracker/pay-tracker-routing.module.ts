import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PAY_TRACKER_ROUTES } from '@configs/routes.config';

import { PaymentsPage } from './pages/payments/payments.page';

const routes: Routes = [
    {
        path: '',
        redirectTo: `/${PAY_TRACKER_ROUTES.MODULE}/${PAY_TRACKER_ROUTES.PAYMENTS}`,
        pathMatch: 'full',
    },
    {
        path: PAY_TRACKER_ROUTES.PAYMENTS,
        component: PaymentsPage,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PayTracketRoutingModule {}
