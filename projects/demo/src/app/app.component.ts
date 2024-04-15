import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxNotificationsComponent, NgxNotificationsService } from '../../../ngx-notifications/src/public-api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NgxNotificationsComponent,
    RouterOutlet
  ],
  providers: [
    NgxNotificationsService
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent implements OnInit {

  constructor(private _notificationService: NgxNotificationsService) {

  }

  ngOnInit(): void {
    this.request()
  }

  get() {
    return this._notificationService.get()
  }

  error() {
    this._notificationService.open({ type: 'error', header: 'Fehler', message: 'Es ist ein Fehler aufgetreten', autoClose: false })?.subscribe((data: any) => { 
      if (data == true) alert('yes')
    })
  }

  request() {
    this._notificationService.open({ type: 'request', header: 'Streife beendet', message: 'Möchten sie eine neue Streife vorbereiten (ja) oder die angezeigte Sreife ansehen (nein)? Dann haben Sie die Möglichkeit hier. Hier soll nun auch getestet werden ob die Notification frei skaliert.', autoClose: false })?.subscribe((data: any) => { 
      if (data == true) alert('yes')
    })
  }

  success() {
    this._notificationService.open({ type: 'success', header: 'Erfolg', message: 'Erfolgreich abgeschlossen', autoClose: false })?.subscribe((data: any) => { 
      if (data == true) alert('yes')
    })
  }

  warning() {
    this._notificationService.open({ type: 'warning', header: 'Warnung', message: 'Erfolgreich abgeschlossen', autoClose: false })?.subscribe((data: any) => { 
      if (data == true) alert('yes')
    })
  }
}
