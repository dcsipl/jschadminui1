import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-slide-images',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './slide-images.html',
  styleUrls: ['./slide-images.css']
})
export class SlideImagesComponent implements OnInit {
  images: any[] = [];
  selectedFile: File | null = null;
  imageName: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadImages();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  // uploadImage(): void {
  //   if (!this.selectedFile || !this.imageName) return;

  //   const formData = new FormData();
  //   formData.append('image', this.selectedFile);
  //   formData.append('image_name', this.imageName);

  //   this.http.post('http://localhost:5000/api/slideimages/', formData).subscribe(() => {
  //     this.selectedFile = null;
  //     this.imageName = '';
  //     this.loadImages();
  //   });
  // }

  uploadImage(): void {
  if (!this.selectedFile || !this.imageName) return;

  const reader = new FileReader();
  reader.onload = () => {
    const base64Image = reader.result as string;

    const body = {
      image_name: this.imageName,
      image_data: base64Image
    };

    this.http.post('http://localhost:5000/api/slideimages/', body).subscribe(() => {
      this.selectedFile = null;
      this.imageName = '';
      this.loadImages();
       location.reload();
    });
  };

  reader.readAsDataURL(this.selectedFile);
}

  loadImages(): void {
    this.http.get<any[]>('http://localhost:5000/api/slideimages/').subscribe(data => {
      this.images = data;
    });
  }

  deleteImage(id: string): void {
    this.http.delete(`http://localhost:5000/api/slideimages/${id}`).subscribe(() => {
      this.loadImages();
    });
  }
}
