import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-business-associates',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './business-associates.html',
  styleUrls: ['./business-associates.css']
})
export class BusinessAssociatesComponent implements OnInit {
  businessAssociates: any[] = [];
  newAssociate: any = { Name: '', Link: '' };
  associateMessage = '';
  associateMessageType = '';
  associateIdToDelete: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAssociates();
  }

  loadAssociates(): void {
    this.http.get<any[]>('http://localhost:5000/api/businessassociate/').subscribe(
      data => this.businessAssociates = data,
      error => console.error("Error loading associates:", error)
    );
  }

  addAssociate(): void {
    const urlRegex = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;

    if (!this.newAssociate.Name || !this.newAssociate.Link) {
      this.setMessage('❌ Please fill both Name and Link.', 'error');
      return;
    }

    if (!urlRegex.test(this.newAssociate.Link)) {
      this.setMessage('❌ Please enter a valid URL (e.g., https://example.com)', 'error');
      return;
    }

    this.http.post('http://localhost:5000/api/businessassociate/', this.newAssociate).subscribe(() => {
      this.setMessage('✅ Business Associate added successfully!', 'success');
      this.newAssociate = { Name: '', Link: '' };
      this.loadAssociates();
    }, error => {
      this.setMessage('❌ Add failed. Please try again.', 'error');
      console.error(error);
    });
  }

  startEdit(item: any): void {
    item.isEditing = true;
    item.editName = item.Name;
    item.editLink = item.Link;
  }

  cancelEdit(item: any): void {
    item.isEditing = false;
  }

  saveEdit(item: any): void {
    const urlRegex = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;

    if (!item.editName || !item.editLink) {
      this.setMessage('❌ Please fill both Name and Link.', 'error');
      return;
    }

    if (!urlRegex.test(item.editLink)) {
      this.setMessage('❌ Please enter a valid URL.', 'error');
      return;
    }

    const payload = { Name: item.editName, Link: item.editLink };

    this.http.put(`http://localhost:5000/api/businessassociate/${item.AssociateID}`, payload).subscribe(() => {
      item.Name = item.editName;
      item.Link = item.editLink;
      item.isEditing = false;
      this.setMessage('✅ Business Associate updated successfully.', 'success');
    }, error => {
      this.setMessage('❌ Update failed.', 'error');
      console.error(error);
    });
  }

  confirmDelete(id: string): void {
    this.associateIdToDelete = id;
    const modal = document.getElementById('deletebusinessConfirmModal')!;
    const bsModal = new (window as any).bootstrap.Modal(modal);
    bsModal.show();
  }

  deleteConfirmed(): void {
    if (!this.associateIdToDelete) return;

    this.http.delete(`http://localhost:5000/api/businessassociate/${this.associateIdToDelete}`).subscribe(() => {
      this.setMessage('✅ Business Associate deleted.', 'success');
      this.loadAssociates();
       const modalElement = document.getElementById('deletebusinessConfirmModal');
    if (modalElement) {
      const bsModal = (window as any).bootstrap.Modal.getInstance(modalElement);
      if (bsModal) {
        bsModal.hide();
      }
    }
      this.associateIdToDelete = null;
    }, error => {
      this.setMessage('❌ Delete failed.', 'error');
      console.error(error);
    });
  }

  setMessage(message: string, type: string): void {
    this.associateMessage = message;
    this.associateMessageType = type;
    setTimeout(() => this.associateMessage = '', 4000);
  }
}
