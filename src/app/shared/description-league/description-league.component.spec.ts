import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionLeagueComponent } from './description-league.component';

describe('DescriptionLeagueComponent', () => {
  let component: DescriptionLeagueComponent;
  let fixture: ComponentFixture<DescriptionLeagueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DescriptionLeagueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DescriptionLeagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
