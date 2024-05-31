# NgxNotifications

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.0.

## Demo

[Demo](https://christophhu.github.io/ngx-notifications/)

## Use
Add the `<ngx-notifications>`-Tag on Top of the main Component.
```html
<ngx-notifications></ngx-notifications>
```

```typescript
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgxNotificationsComponent,
    ...
  ],
  providers: [
    NgxNotificationsService
  ],
  ...
})
export class AppComponent {
  constructor(private _notificationService: NgxNotificationsService) {}
    this._notificationService.open({ type: 'warning', header: 'Eintrag löschen', message: 'Soll der Eintrag wirklich gelöscht werden?', autoClose: false })?.subscribe((data: any) => { 
      // if (data == true) alert('yes')
    })
  addNotification() {
    
  }
}
```

You can inject the `NgxNotificationsService` in imported Modules, to use the Component too. This must be a peerDependencie in that case.
