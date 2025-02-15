import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaVehiculoComponent } from './categoria-vehiculo.component';

describe('CategoriaVehiculoComponent', () => {
  let component: CategoriaVehiculoComponent;
  let fixture: ComponentFixture<CategoriaVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriaVehiculoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriaVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
