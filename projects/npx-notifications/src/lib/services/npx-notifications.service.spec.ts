import { TestBed } from '@angular/core/testing'
import { NpxNotificationsService } from './npx-notifications.service'

describe('SnackService', () => {
  let service: NpxNotificationsService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(NpxNotificationsService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
