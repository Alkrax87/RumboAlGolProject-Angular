import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopListTeamsComponent } from './top-list-teams.component';

describe('TopListTeamsComponent', () => {
  let component: TopListTeamsComponent;
  let fixture: ComponentFixture<TopListTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopListTeamsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopListTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
