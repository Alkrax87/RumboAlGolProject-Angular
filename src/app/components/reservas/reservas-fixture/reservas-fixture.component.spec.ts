import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasFixtureComponent } from './reservas-fixture.component';

describe('ReservasFixtureComponent', () => {
  let component: ReservasFixtureComponent;
  let fixture: ComponentFixture<ReservasFixtureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservasFixtureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservasFixtureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
