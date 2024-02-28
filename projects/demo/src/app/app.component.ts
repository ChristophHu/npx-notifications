import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NpxNotificationsComponent, NpxNotificationsService } from '../../../npx-notifications/src/public-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NpxNotificationsComponent,
    RouterOutlet
  ],
  providers: [
    NpxNotificationsService
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent implements OnInit {

  constructor(private _notificationService: NpxNotificationsService) {

  }

  ngOnInit(): void {
    this.request()
  }

  request() {
    this._notificationService.open({ type: 'request', header: 'Streife beendet', message: 'Möchten sie eine neue Streife vorbereiten?', autoClose: false })?.subscribe((data: any) => { 
      // if (data == true) alert('yes')
    })
  }

  error() {
    this._notificationService.open({ type: 'error', header: 'Fehler', message: 'Es ist ein Fehler aufgetreten', autoClose: false })?.subscribe((data: any) => { 
      // if (data == true) alert('yes')
    })
  }

  success() {
    this._notificationService.open({ type: 'success', header: 'Erfolg', message: 'Erfolgreich abgeschlossen', autoClose: false })?.subscribe((data: any) => { 
      // if (data == true) alert('yes')
    })
  }
}
