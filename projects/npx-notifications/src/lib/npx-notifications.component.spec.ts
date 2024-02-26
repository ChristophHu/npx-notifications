import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpxNotificationsComponent } from './npx-notifications.component';

describe('NpxNotificationsComponent', () => {
  let component: NpxNotificationsComponent;
  let fixture: ComponentFixture<NpxNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NpxNotificationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NpxNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
