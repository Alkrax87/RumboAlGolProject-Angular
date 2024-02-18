import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminatoriasFixtureComponent } from './eliminatorias-fixture.component';

describe('EliminatoriasFixtureComponent', () => {
  let component: EliminatoriasFixtureComponent;
  let fixture: ComponentFixture<EliminatoriasFixtureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EliminatoriasFixtureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EliminatoriasFixtureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
