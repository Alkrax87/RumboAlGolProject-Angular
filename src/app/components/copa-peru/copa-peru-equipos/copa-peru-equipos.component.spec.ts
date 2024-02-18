import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopaPeruEquiposComponent } from './copa-peru-equipos.component';

describe('CopaPeruEquiposComponent', () => {
  let component: CopaPeruEquiposComponent;
  let fixture: ComponentFixture<CopaPeruEquiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CopaPeruEquiposComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CopaPeruEquiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
