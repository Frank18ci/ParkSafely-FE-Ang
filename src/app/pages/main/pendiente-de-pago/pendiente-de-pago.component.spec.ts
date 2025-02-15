import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendienteDePagoComponent } from './pendiente-de-pago.component';

describe('PendienteDePagoComponent', () => {
  let component: PendienteDePagoComponent;
  let fixture: ComponentFixture<PendienteDePagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendienteDePagoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendienteDePagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
