import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonDetails } from './common-details';

describe('CommonDetails', () => {
  let component: CommonDetails;
  let fixture: ComponentFixture<CommonDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
