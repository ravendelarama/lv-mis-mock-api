import { Component } from '@angular/core';
import { WebService } from '../../services/web.service';

@Component({
  selector: 'lv-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private webService: WebService) {}

  signInWithGoogle() {
    this.webService.signInWithGoogle();
  }
}
