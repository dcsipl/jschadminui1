import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessAssociatesComponent } from './business-associates';

describe('BusinessAssociates', () => {
  let component: BusinessAssociatesComponent;
  let fixture: ComponentFixture<BusinessAssociatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessAssociatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessAssociatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

