import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-preview.html',
  styleUrls: ['./image-preview.css']
})
export class ImagePreviewComponent implements OnInit {
  images: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadImages();
  }

  loadImages(): void {
    this.http.get<any[]>('http://localhost:5000/api/slideimages/').subscribe(data => {
      this.images = data;
    });
  }

imageIdToDelete: string | null = null;

deleteConfirmed(): void {
  if (!this.imageIdToDelete) return;

  this.http.delete(`http://localhost:5000/api/slideimages/${this.imageIdToDelete}`).subscribe({
    next: () => {
      this.loadImages(); // Refresh the image list
      this.imageIdToDelete = null; // Clear stored ID
    },
    error: (err) => {
      console.error('Delete failed', err);
    }
  });
}

}
