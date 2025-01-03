import { Component } from '@angular/core';
import { WebService } from '../../services/web.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

interface System {
  name: string;
  description: string;
  logoUrl: string;
  authenticationUrlSegment: string;
}

@Component({
  selector: 'lv-portal',
  templateUrl: './portal.component.html',
  styleUrl: './portal.component.css',
})
export class PortalComponent {
  systems: System[] = [];

  constructor(private webService: WebService, private authService: AuthService, private router: Router) {
    this.systems = [
      {
        name: 'Student Attendance Management System',
        description: 'This is System A',
        logoUrl: 'https://placehold.co/600x400?text=SAMS',
        authenticationUrlSegment: 'sams-redirect',
      },
      {
        name: 'Grading Management System',
        description: 'This is System B',
        logoUrl: 'https://placehold.co/600x400?text=GMS',
        authenticationUrlSegment: 'gms-redirect',
      },
      {
        name: 'Human Resources Information System',
        description: 'This is System C',
        logoUrl: 'https://placehold.co/600x400?text=HRIS',
        authenticationUrlSegment: 'hris-redirect',
      },
      {
        name: 'Classroom Schedule and Room Management System',
        description: 'This is System D',
        logoUrl: 'https://placehold.co/600x400?text=CSRMS',
        authenticationUrlSegment: 'csrms-redirect',
      },
      {
        name: 'LV Student Portal',
        description: 'This is System E',
        logoUrl: 'https://placehold.co/600x400?text=LV+Connect',
        authenticationUrlSegment: 'lvconnect-redirect',
      },
    ];
  }

  xRedirect(system: System) {
    this.webService.xSystemRedirect(system.authenticationUrlSegment).subscribe({
      next: (res: any) => {
        console.log(res);
        window.location.href = res.redirectUri;
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  logout() {
    this.authService.removeToken("portal-access-token")
    this.router.navigate(['/']);
  }

  signInWithGoogle() {
    this.webService.signInWithGoogle();
  }


  testFromSams(){
    this.webService.testFromSams().subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }
}
