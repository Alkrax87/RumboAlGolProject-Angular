import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminatoriasTablaComponent } from './eliminatorias-tabla.component';

describe('EliminatoriasTablaComponent', () => {
  let component: EliminatoriasTablaComponent;
  let fixture: ComponentFixture<EliminatoriasTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EliminatoriasTablaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EliminatoriasTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
