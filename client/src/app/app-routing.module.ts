import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { OauthRedirectComponent } from './pages/oauth-redirect/oauth-redirect.component';
import { authGuard, guestGuard } from './guards/auth.guard';
import { PortalComponent } from './pages/portal/portal.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authGuard],
  },
  {
    path: 'auth/callback',
    component: OauthRedirectComponent,
  },
  {
    path: 'portal',
    component: PortalComponent,
    canActivate: [guestGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
