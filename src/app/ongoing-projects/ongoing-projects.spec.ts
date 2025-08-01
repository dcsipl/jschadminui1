import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingProjectsComponent } from './ongoing-projects';

describe('OngoingProjects', () => {
  let component: OngoingProjectsComponent;
  let fixture: ComponentFixture<OngoingProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OngoingProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OngoingProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
