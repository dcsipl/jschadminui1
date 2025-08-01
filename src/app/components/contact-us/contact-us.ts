import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact-us.html',
  styleUrls: ['./contact-us.css']
})
export class ContactUsComponent implements OnInit {
  contactUsData: any[] = [];
  contactMessage: string = '';
  contactMessageType: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.http.get<any[]>('http://localhost:5000/api/contactus/').subscribe(
      (data) => (this.contactUsData = data),
      (error) => console.error('Error fetching contact data:', error)
    );
  }

  startEdit(item: any): void {
    item.isEditing = true;
    item.editName = item.Name;
    item.editEmail = item.Email;
    item.editPhone = item.Phone;
  }

  cancelEdit(item: any): void {
    item.isEditing = false;
  }

  saveEdit(item: any): void {
    const payload = {
      Name: item.editName,
      Email: item.editEmail,
      Phone: item.editPhone
    };

    this.http.put(`http://localhost:5000/api/contactus/${item.ContactID}`, payload).subscribe(
      () => {
        this.contactMessage = '✅ Contact updated successfully';
        this.contactMessageType = 'success';

        item.Name = item.editName;
        item.Email = item.editEmail;
        item.Phone = item.editPhone;
        item.isEditing = false;
      },
      (error) => {
        this.contactMessage = '❌ Contact update failed';
        this.contactMessageType = 'error';
        console.error(error);
      }
    );
  }
}
