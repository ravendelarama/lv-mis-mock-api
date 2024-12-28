import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { NgxSpinnerModule } from "ngx-spinner";

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PortalComponent } from './components/portal/portal.component';
import { LoginComponent } from './pages/login/login.component';
import { OauthRedirectComponent } from './pages/oauth-redirect/oauth-redirect.component';

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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
