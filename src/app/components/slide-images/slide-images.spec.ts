import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideImagesComponent } from './slide-images';

describe('SlideImages', () => {
  let component: SlideImagesComponent;
  let fixture: ComponentFixture<SlideImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideImagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlideImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
