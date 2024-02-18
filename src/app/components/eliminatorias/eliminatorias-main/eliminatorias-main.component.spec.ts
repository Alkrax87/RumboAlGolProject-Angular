import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminatoriasMainComponent } from './eliminatorias-main.component';

describe('EliminatoriasMainComponent', () => {
  let component: EliminatoriasMainComponent;
  let fixture: ComponentFixture<EliminatoriasMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EliminatoriasMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EliminatoriasMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
