import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxNotificationsComponent, NgxNotificationsService } from '../../../ngx-notifications/src/public-api';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    JsonPipe,
    NgxNotificationsComponent,
    ReactiveFormsModule,
    RouterOutlet
  ],
  providers: [
    NgxNotificationsService
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent implements OnInit {

  notificationForm: FormGroup
  types: string[] = ['error', 'request', 'success', 'warning']

  constructor(private _notificationService: NgxNotificationsService) {
    this.notificationForm = new FormGroup({
      type: new FormControl(''),
      header: new FormControl(''),
      message: new FormControl(''),
      autoClose: new FormControl(false)
    })
  }

  ngOnInit(): void {
    // this.error()
  }


  createNotification() {
    this._notificationService.open(this.notificationForm.value)?.subscribe((data: any) => { 
      if (data == true) console.log('result: ', data)
    })
  }

  get() {
    return this._notificationService.get()
  }

  error() {
    this._notificationService.open({ type: 'error', header: 'Fehler', message: 'Es ist ein Fehler aufgetreten', autoClose: false })?.subscribe((data: any) => { 
      // if (data == true) alert('yes')
    })
  }

  request() {
    this._notificationService.open({ type: 'request', header: 'Event beendet', message: 'Möchten Sie einen neuen Event vorbereiten (ja) oder den angezeigten Event ansehen (nein)? Dann haben Sie die Möglichkeit hier. Hier soll nun auch getestet werden ob die Notification frei skaliert.', autoClose: false })?.subscribe((data: any) => { 
      // if (data == true) alert('yes')
    })
  }

  success() {
    this._notificationService.open({ type: 'success', header: 'Erfolg', message: 'Erfolgreich abgeschlossen', autoClose: false })?.subscribe((data: any) => { 
      // if (data == true) alert('yes')
    })
  }

  warning() {
    this._notificationService.open({ type: 'warning', header: 'Achtung', message: 'Es muss folgendes beachtet werden:', autoClose: false })?.subscribe((data: any) => { 
      // if (data == true) alert('yes')
    })
  }
}