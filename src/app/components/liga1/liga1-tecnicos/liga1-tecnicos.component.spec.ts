import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Liga1TecnicosComponent } from './liga1-tecnicos.component';

describe('Liga1TecnicosComponent', () => {
  let component: Liga1TecnicosComponent;
  let fixture: ComponentFixture<Liga1TecnicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Liga1TecnicosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Liga1TecnicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
