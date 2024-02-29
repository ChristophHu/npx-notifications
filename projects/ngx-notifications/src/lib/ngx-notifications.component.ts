import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { SaveHtmlPipe } from './pipes/save-html.pipe';
import { PositionType } from './model/position.type';
import { Subject, takeUntil } from 'rxjs';
import { NgxNotificationsService } from '../public-api';
import { Notification } from './model/notification.model';

@Component({
  selector: 'ngx-notifications',
  standalone: true,
  imports: [
    CommonModule
  ],
  providers: [
    SaveHtmlPipe
  ],
  templateUrl: `./ngx-notifications.component.html`,
  styleUrls: ['./ngx-notifications.component.sass'],
  animations: [
    trigger('fadeInRight', [
      state('void', style({ opacity: 0, transform: 'translate3d(100%, 0, 0)' })),
      state('*', style({ opacity: 1, transform: 'translate3d(0, 0, 0)' })),
      transition('void => false', []),
      transition('void => *', animate('200ms 200ms cubic-bezier(0.0, 0.0, 0.2, 1)'))
    ]),
    trigger('fadeOutRight', [
      state('*', style({ opacity: 1, transform: 'translate3d(0, 0, 0)' })),
      state('void', style({ opacity: 0, transform: 'translate3d(100%, 0, 0)' })),
      transition('false => void', []),
      transition('* => void', animate('200ms 50ms cubic-bezier(0.0, 0.0, 0.2, 1)'))
    ]),
  ]
})
export class NgxNotificationsComponent implements OnDestroy{
  @Input() position: PositionType = 'top-right'

  @Output() public onAdd: EventEmitter<any> = new EventEmitter<any>()
  @Output() public onRemove: EventEmitter<any> = new EventEmitter<any>()
  @Output() public onClear: EventEmitter<boolean> = new EventEmitter<boolean>()

  notifications: Array<Notification> = []
  private _notificationsConfig: any
  private default_values: Partial<Notification>

  destroy$: Subject<boolean> = new Subject<boolean>()

  constructor(private _ngxNotificationsService: NgxNotificationsService) {
    this._notificationsConfig = {
      position: 'top-right',
      type: 'info',
      header: 'Info',
      message: '',
      autoclose: true,
      timeout: 15000,
      max: 5
    }

    this.default_values = { 
      type: this._notificationsConfig.type, 
      header: this._notificationsConfig.header, 
      message: this._notificationsConfig.message, 
      autoClose: this._notificationsConfig.autoclose, 
      timeout: this._notificationsConfig.timeout,
      response: {}
    }

    this.position = this._notificationsConfig.position
    this._ngxNotificationsService.get()
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe((notification: any) => {
      console.log('notification:', notification)
      if (!notification) return

      switch (notification.action) {
        case 'add':
          this.add(notification.data)
          break
        case 'remove':
          this.remove(notification.id)
          break
        case 'clear':
          this.clear()
          break
      }
    })
  }

  ngOnDestroy(): void {
    console.log('Notification.ngOnDestroy')
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }

  add(notification: any) {
    notification = Object.assign({}, this.default_values, notification)

    let timeout
    const id = this.uuid()

    if (this._notificationsConfig.max && this.notifications.length === this._notificationsConfig.max ) {
      this.remove(this.notifications[0].id)
    }

    if (notification.autoClose && notification.timeout) {
      timeout = setTimeout(() => {
        this.remove(id)
      }, notification.timeout || this._notificationsConfig.timeout)
    }

    notification = Object.assign({ id: id, timeoutObj: timeout }, notification)

    // if (notification.data) {
    //   const fn = notification.data
    //   notification.data = (response: any) => {
    //     fn && typeof fn === 'function' && fn(response)
    //     console.log('notification data:', response)
    //     this.remove(id)
    //   }
    // }

    if (notification.onAdd) {
      notification.onAdd(notification)
    }

    if (this.onAdd) {
      this.onAdd.emit(notification)
    }

    this.notifications.push(notification)
    console.log('notifications-add:', this.notifications)
  }

  remove(id: string) {
    console.log('remove:', id)
    const notification = this.notifications.find(obj => obj.id === id)

    if (notification) {
      if (notification.onRemove) {
        notification.onRemove(notification)
      }

      if (this.onRemove) {
        this.onRemove.emit(notification)
      }

      if (notification.timeoutObj) {
        clearTimeout(notification.timeoutObj)
      }
    }

    this.notifications = this.notifications.filter(obj => obj.id !== id)
    console.log('notifications-remove:', this.notifications)

  }

  clear() {
    // this.notifications.forEach(snack => {
    //   this.remove(snack.id)
    // })
    if (this.notifications.length === 0) return

    this.notifications = []

    if (this.onClear) {
      this.onClear.emit(true)
    }
  }

  uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }
}
