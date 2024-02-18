import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopaPeruTablaComponent } from './copa-peru-tabla.component';

describe('CopaPeruTablaComponent', () => {
  let component: CopaPeruTablaComponent;
  let fixture: ComponentFixture<CopaPeruTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CopaPeruTablaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CopaPeruTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
