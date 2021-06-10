import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

});
