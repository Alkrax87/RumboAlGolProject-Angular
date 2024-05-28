import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasTablaComponent } from './reservas-tabla.component';

describe('ReservasTablaComponent', () => {
  let component: ReservasTablaComponent;
  let fixture: ComponentFixture<ReservasTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservasTablaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservasTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
