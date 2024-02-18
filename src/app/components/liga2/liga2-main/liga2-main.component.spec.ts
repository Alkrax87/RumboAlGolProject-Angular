import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Liga2MainComponent } from './liga2-main.component';

describe('Liga2MainComponent', () => {
  let component: Liga2MainComponent;
  let fixture: ComponentFixture<Liga2MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Liga2MainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Liga2MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
