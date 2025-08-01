import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-copyright',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './copyright.html',
  styleUrls: ['./copyright.css']
})
export class CopyrightComponent implements OnInit {
  copyrightData: any[] = [];
  message: string = '';
  messageType: 'success' | 'error' = 'success';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCopyright();
  }

  loadCopyright(): void {
    this.http.get<any[]>('http://localhost:5000/api/copyright/').subscribe({
      next: (data) => {
        this.copyrightData = data.map((item) => ({
          ...item,
          isEditing: false,
          editContent: item.Content
        }));
      },
      error: (err) => {
        console.error('Error loading copyright data', err);
      }
    });
  }

  startEdit(item: any): void {
    item.isEditing = true;
    item.editContent = item.Content;
  }

  cancelEdit(item: any): void {
    item.isEditing = false;
  }

  saveEdit(item: any): void {
    const payload = { Content: item.editContent };

    this.http.put(`http://localhost:5000/api/copyright/${item.CopyRightID}`, payload).subscribe({
      next: () => {
        item.Content = item.editContent;
        item.isEditing = false;
        this.message = '✅ Copyright updated successfully';
        this.messageType = 'success';
      },
      error: (err) => {
        console.error(err);
        this.message = '❌ Copyright update failed';
        this.messageType = 'error';
      }
    });
  }

  closeMessage(): void {
    this.message = '';
  }
}
