import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './common/header/header.component';
// Add your real components here

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'common', component: HeaderComponent },
  { path: 'ongoing', component: HomeComponent }, // This should be your real OngoingProjectComponent
  { path: 'available', component: HomeComponent }, // Replace with AvailableProjectsComponent
  { path: 'gallery', component: HomeComponent } // Replace with GalleryComponent
];
