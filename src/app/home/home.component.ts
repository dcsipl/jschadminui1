import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  currentPage: string = 'common';

  pageTitles: Record<string, string> = {
    common: 'JSCH - Common Details',
    ongoing: 'JSCH - Ongoing Projects',
    available: 'JSCH - Available Projects',
    gallery: 'JSCH - Gallery'
  };

  navigate(page: string) {
    this.currentPage = page;
  }
get currentTitle(): string {
    return this.pageTitles[this.currentPage] || 'JSCH Admin Portal';
  }
}

