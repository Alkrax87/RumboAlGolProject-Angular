import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasMainComponent } from './reservas-main.component';

describe('ReservasMainComponent', () => {
  let component: ReservasMainComponent;
  let fixture: ComponentFixture<ReservasMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservasMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservasMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
