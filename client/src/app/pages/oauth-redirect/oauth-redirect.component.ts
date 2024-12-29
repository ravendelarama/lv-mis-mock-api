import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { WebService } from '../../services/web.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'lv-oauth-redirect',
  templateUrl: './oauth-redirect.component.html',
  styleUrl: './oauth-redirect.component.css',
})
export class OauthRedirectComponent implements OnInit, OnDestroy {
  errorMessage: string = '';
  accessToken: string = '';

  constructor(
    private spinnerService: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private webService: WebService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.accessToken = this.route.snapshot.queryParams['at'] || '';

    if (!this.accessToken) {
      this.router.navigate(['/']);
    }

    this.validate();
  }

  ngOnDestroy(): void {
    this.errorMessage = '';
  }

  validate() {
    this.spinnerService.show();

    this.webService.validateOauthToken(this.accessToken).subscribe({
      next: (res: any) => {
        this.authService.setToken('portal-access-token', this.accessToken);
        setTimeout(() => {
          this.router.navigate(['/portal']);
        }, 1500);
      },
      error: (error) => {
        this.errorMessage = 'Invalid access token';
        setTimeout(() => {
          this.router.navigate(['/login'])
        }, 3000);
      },
      complete: () => {
      },
    });
  }
}
