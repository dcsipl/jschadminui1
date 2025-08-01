import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
declare var bootstrap: any;


@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './about-us.html',
  styleUrls: ['./about-us.css']
})
export class AboutUsComponent implements OnInit {
  aboutUsData: any[] = [];
  updateMessage: string = '';
  aboutMessage: string = '';
  aboutMessageType: string = 'success'; // or 'error'

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAboutUs();
  }

  loadAboutUs(): void {
    this.http.get<any[]>('http://localhost:5000/api/aboutus/').subscribe({
      next: (data) => {
        this.aboutUsData = data.map(item => ({
          ...item,
          isEditing: false,
          newContent: item.content
        }));
      },
      error: () => {
        this.aboutMessage = 'Failed to fetch data';
        this.aboutMessageType = 'error';
      }
    });
  }

  startEdit(item: any): void {
    item.isEditing = true;
    item.newContent = item.content;
  }

  cancelEdit(item: any): void {
    item.isEditing = false;
    item.newContent = item.content;
  }

  saveEdit(item: any): void {
     console.log('Saving item:', item);
    if (!item.ContentId) return;

    this.http.put(`http://localhost:5000/api/aboutus/${item.ContentId}`, { content: item.newContent }).subscribe({
      next: () => {
        item.content = item.newContent;
        item.isEditing = false;
        this.updateMessage = 'Updated successfully!';
        setTimeout(() => this.updateMessage = '', 3000);
        location.reload(); // Hide message after 3s
      },
      error: () => {
        this.aboutMessage = 'Update failed.';
        this.aboutMessageType = 'error';
      }
    });
  }
//showDeleteModal = false;
//aboutIdToDelete: string | null = null;

// confirmDelete(id: string): void {
//   this.aboutIdToDelete = id;
//   this.showDeleteModal = true;
// }

// closeModal(): void {
//   this.showDeleteModal = false;
//   this.aboutIdToDelete = null;
// }

aboutIdToDelete: string | null = null;

deleteConfirmed(): void {
  console.log('Deleting ID:', this.aboutIdToDelete); // ✅ Debug log
  if (!this.aboutIdToDelete) return;

  this.http.delete(`http://localhost:5000/api/aboutus/${this.aboutIdToDelete}`).subscribe({
    next: () => {
      console.log('Delete successful');
      this.aboutMessage = '✅ Deleted successfully!';
      this.aboutMessageType = 'success';
       location.reload(); 
      this.loadAboutUs(); // Reload the table
    },
    error: (err) => {
      console.error('Delete failed:', err);
      this.aboutMessage = '❌ Delete failed.';
      this.aboutMessageType = 'error';
    }
  });
}


// deleteConfirmed(): void {
//   if (!this.aboutIdToDelete) return;

//   this.http.delete(`http://localhost:5000/api/aboutus/${this.aboutIdToDelete}`).subscribe({
//     next: () => {
//       this.aboutMessage = '✅ Deleted successfully!';
//       this.aboutMessageType = 'success';
//       this.loadAboutUs();
//       this.closeModal();
//     },
//     error: () => {
//       this.aboutMessage = '❌ Delete failed.';
//       this.aboutMessageType = 'error';
//       this.closeModal();
//     }
//   });
// }
//aboutIdToDelete: string | null = null;

// deleteConfirmed(): void {
//   if (!this.aboutIdToDelete) return;

//   this.http.delete(`http://localhost:5000/api/aboutus/${this.aboutIdToDelete}`).subscribe({
//     next: () => {
//       this.aboutMessage = '✅ Deleted successfully!';
//       this.aboutMessageType = 'success';
//       this.loadAboutUs();
//     },
//     error: () => {
//       this.aboutMessage = '❌ Delete failed.';
//       this.aboutMessageType = 'error';
//     }
//   });
// }


}


