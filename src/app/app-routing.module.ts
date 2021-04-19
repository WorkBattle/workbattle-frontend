import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { PublicRouterGuard } from '../lib/guard/public-router.guard';
import { PrivateRouterGuard } from '../lib/guard/private-router.guard';
import { PersonalAreaComponent } from './dashboard/personal-area/personal-area.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContestComponent } from './dashboard/contest/contest.component';
import { NotfoundComponent } from './dashboard/notfound/notfound.component';
import { SubmissionComponent } from './dashboard/submission/submission.component';
import { UserProfileComponent } from './dashboard/user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    canActivate: [PublicRouterGuard],
  },
  {
    path: 'main',
    component: DashboardComponent,
    canActivate: [PrivateRouterGuard],
    children: [
      {
        path: '',
        component: PersonalAreaComponent,
      },
      {
        path: 'contest/:uuid',
        component: ContestComponent,
      },
      {
        path: 'submission/:uuid',
        component: SubmissionComponent,
      },
      {
        path: 'profile/:uuid',
        component: UserProfileComponent,
      },
      {
        path: 'notfound',
        component: NotfoundComponent,
      },
      {
        path: '**',
        redirectTo: 'main/notfound',
      },
    ],
  },
  {
    path: 'contest/:uuid',
    redirectTo: '/main/contest/:uuid',
  },
  {
    path: 'submission/:uuid',
    redirectTo: '/main/submission/:uuid',
  },
  {
    path: 'profile/:uuid',
    redirectTo: '/main/profile/:uuid',
  },
  {
    path: '**',
    redirectTo: 'main/notfound',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
