import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Notification } from '../model/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NpxNotificationsService {
  private _npxNotificationService = new Subject<any>()
  
  get() {
    return this._npxNotificationService.asObservable()
  }

  open(notification: Partial<Notification>): Observable<any> | void {
    return new Observable(observer => {
      const note = Object.assign({}, notification, { response: (response: any) => {
        observer.next(response)
        observer.complete()
      }})
      console.log(note)
      this.add(note)
    })
  }

  add(data: any) {
    this._npxNotificationService.next({ action: 'add', data: data })
  }

  remove(id: string) {
    this._npxNotificationService.next({ action: 'remove', id })
  }

  clear() {
    this._npxNotificationService.next({ action: 'clear' })
  }
}
