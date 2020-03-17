/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';
import {HttpClientModule} from '@angular/common/http';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AuthService]
    });
  });

  it('should ...', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
