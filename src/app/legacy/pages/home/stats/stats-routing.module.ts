import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES_NAME } from '@constants/routes-name';
import { UserAuthenticatedGuard } from '@guards/user-authenticated.guard';
import { WorkspaceActivatedGuard } from '@guards/workspace-activated.guard';

import { StatsLayout } from './stats.layout';

const routes: Routes = [
    {
        path: '',
        component: StatsLayout,
        children: [
            {
                path: ROUTES_NAME.statsSnapshot,
                title: 'Agenthos - Data Suite',
                loadChildren: () =>
                    import(
                        '@pages/home/stats/stats-snapshot/stats-snapshot.module'
                    ).then((mod) => mod.StatsSnapshotModule),
                canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard],
            },
            {
                path: ROUTES_NAME.statsLeads,
                loadChildren: () =>
                    import(
                        '@pages/home/stats/stats-leads/stats-leads.module'
                    ).then((mod) => mod.StatsLeadsModule),
                canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard],
            },
            {
                path: ROUTES_NAME.statsClients,
                loadChildren: () =>
                    import(
                        '@pages/home/stats/stats-clients/stats-clients.module'
                    ).then((mod) => mod.StatsClientsModule),
                canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard],
            },
            {
                path: ROUTES_NAME.statsPolicies,
                loadChildren: () =>
                    import(
                        '@pages/home/stats/stats-policies/stats-policies.module'
                    ).then((mod) => mod.StatsPoliciesModule),
                canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard],
            },
            {
                path: ROUTES_NAME.statsCollection,
                loadChildren: () =>
                    import(
                        '@pages/home/stats/stats-collection/stats-collection.module'
                    ).then((mod) => mod.StatsCollectionModule),
                canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard],
            },
            {
                path: ROUTES_NAME.statsSinisters,
                loadChildren: () =>
                    import(
                        '@pages/home/stats/stats-sinisters/stats-sinisters.module'
                    ).then((mod) => mod.StatsSinistersModule),
                canActivate: [UserAuthenticatedGuard, WorkspaceActivatedGuard],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StatsRoutingModule {}
