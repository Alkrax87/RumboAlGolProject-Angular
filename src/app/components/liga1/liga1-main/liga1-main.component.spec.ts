import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Liga1MainComponent } from './liga1-main.component';

describe('Liga1MainComponent', () => {
  let component: Liga1MainComponent;
  let fixture: ComponentFixture<Liga1MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Liga1MainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Liga1MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
