import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminatoriasEquiposComponent } from './eliminatorias-equipos.component';

describe('EliminatoriasEquiposComponent', () => {
  let component: EliminatoriasEquiposComponent;
  let fixture: ComponentFixture<EliminatoriasEquiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EliminatoriasEquiposComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EliminatoriasEquiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
