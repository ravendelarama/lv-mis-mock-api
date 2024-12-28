import { Component } from '@angular/core';
import { WebService } from '../../services/web.service';

@Component({
  selector: 'lv-portal',
  templateUrl: './portal.component.html',
  styleUrl: './portal.component.css'
})
export class PortalComponent {

  constructor(private webService: WebService){}

  test(){
    this.webService.getSelf().subscribe({
      next: (data: any) => console.log(data),
      error: (error: any) => console.error(error)
    });
  }
}
