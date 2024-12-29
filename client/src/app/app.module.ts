import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';

import { NgxSpinnerModule } from "ngx-spinner";

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PortalComponent } from './pages/portal/portal.component';
import { LoginComponent } from './pages/login/login.component';
import { OauthRedirectComponent } from './pages/oauth-redirect/oauth-redirect.component';
import { tokenInterceptor } from './config/token.interceptor';

@NgModule({
  declarations: [AppComponent, PortalComponent, LoginComponent, OauthRedirectComponent],
  imports: [
    BrowserAnimationsModule,
    NgxSpinnerModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule,
    CardModule,
  ],
  providers: [provideHttpClient(withInterceptors([tokenInterceptor]))],
  bootstrap: [AppComponent],
})
export class AppModule {}
