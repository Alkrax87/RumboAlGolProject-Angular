import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminatoriasTecnicosComponent } from './eliminatorias-tecnicos.component';

describe('EliminatoriasTecnicosComponent', () => {
  let component: EliminatoriasTecnicosComponent;
  let fixture: ComponentFixture<EliminatoriasTecnicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EliminatoriasTecnicosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EliminatoriasTecnicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
