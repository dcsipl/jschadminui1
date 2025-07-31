import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideImagesComponent } from '../components/slide-images/slide-images';
import { AboutUsComponent } from '../components/about-us/about-us';
import { AddressComponent } from '../components/address/address';
import { BusinessAssociatesComponent } from '../components/business-associates/business-associates';
import { ContactUsComponent } from '../components/contact-us/contact-us';
import { CopyrightComponent } from '../components/copyright/copyright';
import { ImagePreviewComponent } from '../components/image-preview/image-preview';

@Component({
  standalone: true,
  selector: 'app-common-details',
  templateUrl: './common-details.html',
  styleUrls: ['./common-details.scss'],
  imports: [
    CommonModule,
    SlideImagesComponent,
    AboutUsComponent,
    AddressComponent,
    BusinessAssociatesComponent,
    ContactUsComponent,
    CopyrightComponent,
    ImagePreviewComponent
  ]
})
export class CommonDetailsComponent {}
