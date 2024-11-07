import { Component } from '@angular/core';

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

  constructor() {
    this.systems = [
      {
        name: 'Student Attendance Management System',
        description: 'This is System A',
        logoUrl:
          'https://placehold.co/600x400?text=Student+Attendance+Management+System',
        clientUrl: 'https://client-a.com',
        serverUrl: 'https://server-a.com',
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
    alert(JSON.stringify(system));
  }
}
