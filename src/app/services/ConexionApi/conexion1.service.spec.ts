import { TestBed } from '@angular/core/testing';

import { Conexion1Service } from './conexion1.service';

describe('Conexion1Service', () => {
  let service: Conexion1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Conexion1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
