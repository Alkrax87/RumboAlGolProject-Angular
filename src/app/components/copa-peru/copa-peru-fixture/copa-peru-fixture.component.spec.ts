import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopaPeruFixtureComponent } from './copa-peru-fixture.component';

describe('CopaPeruFixtureComponent', () => {
  let component: CopaPeruFixtureComponent;
  let fixture: ComponentFixture<CopaPeruFixtureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CopaPeruFixtureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CopaPeruFixtureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
