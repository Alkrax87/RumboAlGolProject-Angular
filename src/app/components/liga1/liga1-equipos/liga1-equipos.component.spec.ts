import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Liga1EquiposComponent } from './liga1-equipos.component';

describe('Liga1EquiposComponent', () => {
  let component: Liga1EquiposComponent;
  let fixture: ComponentFixture<Liga1EquiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Liga1EquiposComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Liga1EquiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
