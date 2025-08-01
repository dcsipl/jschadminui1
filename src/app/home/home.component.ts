// import { Component } from '@angular/core';
// import { RouterModule, Router } from '@angular/router';

// @Component({
//   standalone: true,
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.scss'],
//   imports: [RouterModule]
// })
// export class HomeComponent {
//   constructor(private router: Router) {}

//   pageTitles: Record<string, string> = {
//     common: 'JSCH - Common Details',
//     ongoing: 'JSCH - Ongoing Projects',
//     available: 'JSCH - Available Projects',
//     gallery: 'JSCH - Gallery'
//   };

//   navigate(page: string) {
//     this.router.navigate(['/' + page]);
//   }

//   get currentTitle(): string {
//     const route = this.router.url.slice(1);
//     return this.pageTitles[route] || 'JSCH Admin Portal';
//   }
// }
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router'; // ✅ include RouterModule
import { CommonModule } from '@angular/common'; // ✅ for *ngIf, *ngFor, etc.
import { filter } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, RouterModule] // ✅ required modules here
})
export class HomeComponent implements OnInit {
  currentTitle: string = 'JSCH Admin Portal';

  pageTitles: Record<string, string> = {
    common: 'JSCH - Common Details',
    ongoing: 'JSCH - Ongoing Projects',
    available: 'JSCH - Available Projects',
    gallery: 'JSCH - Gallery'
  };

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const route = event.urlAfterRedirects.split('/')[1];
      this.currentTitle = this.pageTitles[route] || 'JSCH Admin Portal';
    });
  }

  navigate(page: string) {
    this.router.navigate(['/' + page]);
  }
}


