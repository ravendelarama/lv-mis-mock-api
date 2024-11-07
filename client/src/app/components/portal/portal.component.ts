import { Component } from '@angular/core';
import { WebService } from '../../services/web.service';

interface System {
  name: string;
  description: string;
  logoUrl: string;
  clientUrl: string;
  serverUrl: string;
}

@Component({
  selector: 'lv-portal',
  templateUrl: './portal.component.html',
  styleUrl: './portal.component.css',
})
export class PortalComponent {
  systems: System[] = [];

  constructor(private webService: WebService) {
    this.systems = [
      {
        name: 'Student Attendance Management System',
        description: 'This is System A',
        logoUrl:
          'https://placehold.co/600x400?text=Student+Attendance+Management+System',
        clientUrl: 'http://localhost:4200',
        serverUrl: 'http://localhost:5050',
      },
      {
        name: 'Grading Management System',
        description: 'This is System B',
        logoUrl: 'https://placehold.co/600x400?text=Grading+Management+System',
        clientUrl: 'https://client-b.com',
        serverUrl: 'https://server-b.com',
      },
    ];
  }

  xRedirect(system: System) {
    this.webService.xSystemRedirect(`http://localhost:3000/api/x-system/sams-redirect`).subscribe({
      next: (res: any) => {
        console.log(res)
        window.location.href = res.data.redirectUri;
      },
      error: (error) => {
        console.error('Error:', error);
      },
    })
  }

  logout(){
    this.webService.logout().subscribe({
      next: (res: any) => {
        console.log(res)
      },
      error: (error) => {
        console.error('Error:', error);
      },
    })
  }
}
