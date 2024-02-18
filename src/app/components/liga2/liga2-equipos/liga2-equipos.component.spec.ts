import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Liga2EquiposComponent } from './liga2-equipos.component';

describe('Liga2EquiposComponent', () => {
  let component: Liga2EquiposComponent;
  let fixture: ComponentFixture<Liga2EquiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Liga2EquiposComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Liga2EquiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
