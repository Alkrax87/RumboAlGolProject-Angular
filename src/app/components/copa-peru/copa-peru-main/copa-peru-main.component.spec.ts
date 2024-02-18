import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopaPeruMainComponent } from './copa-peru-main.component';

describe('CopaPeruMainComponent', () => {
  let component: CopaPeruMainComponent;
  let fixture: ComponentFixture<CopaPeruMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CopaPeruMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CopaPeruMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
