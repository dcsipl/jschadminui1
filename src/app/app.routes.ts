// import { Routes } from '@angular/router';
// import { HomeComponent } from './home/home.component';
// import { HeaderComponent } from './common/header/header.component';
// import { CommonDetailsComponent } from './common-details/common-details';





// export const routes: Routes = [
//   {
//     path: '',
//     component: HomeComponent, // this has header/sidebar
//     children: [
//       { path: 'common', component: CommonDetailsComponent },
//       { path: 'ongoing', component: HomeComponent },
//       { path: 'available', component: HomeComponent },
//       { path: 'gallery', component: HomeComponent },
//       { path: '', redirectTo: 'common', pathMatch: 'full' },
//     ],
//   },
//   { path: '**', redirectTo: '' }
// ];

import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CommonDetailsComponent } from './common-details/common-details';
import { OngoingProjectsComponent } from './ongoing-projects/ongoing-projects';
import { AvailableProjectsComponent } from './available-projects/available-projects';
import { GalleryComponent } from './gallery/gallery';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'common', pathMatch: 'full' }, // ⬅️ default child route
      { path: 'common', component: CommonDetailsComponent },
      { path: 'ongoing', component: OngoingProjectsComponent },
      { path: 'available', component: AvailableProjectsComponent },
      { path: 'gallery', component: GalleryComponent },
    ]
  },
  { path: '**', redirectTo: '' }
];
