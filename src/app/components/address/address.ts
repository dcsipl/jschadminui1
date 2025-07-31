import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './address.html',
  styleUrls: ['./address.css']
})
export class AddressComponent implements OnInit {
  addressData: any[] = [];
  addressMessage: string = '';
  addressMessageType: 'success' | 'error' | '' = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAddresses();
  }

  loadAddresses(): void {
    this.http.get<any[]>('http://localhost:5000/api/address/').subscribe({
      next: (data) => {
        this.addressData = data.map((item: any) => ({
          ...item,
          isEditing: false,
          editLine1: item.Line1,
          editLine2: item.Line2,
          editLine3: item.Line3
        }));
      },
      error: (error) => {
        this.addressMessage = '❌ Failed to load address data.';
        this.addressMessageType = 'error';
        console.error(error);
      }
    });
  }

  startEdit(item: any): void {
    item.isEditing = true;
  }

  cancelEdit(item: any): void {
    item.isEditing = false;
    item.editLine1 = item.Line1;
    item.editLine2 = item.Line2;
    item.editLine3 = item.Line3;
  }

  saveEdit(item: any): void {
    const payload = {
      Line1: item.editLine1,
      Line2: item.editLine2,
      Line3: item.editLine3
    };

    this.http.put(`http://localhost:5000/api/address/${item.AddressId}`, payload).subscribe({
      next: () => {
        item.Line1 = item.editLine1;
        item.Line2 = item.editLine2;
        item.Line3 = item.editLine3;
        item.isEditing = false;

        this.addressMessage = '✅ Address updated successfully';
        this.addressMessageType = 'success';
      },
      error: (error) => {
        this.addressMessage = '❌ Failed to update address';
        this.addressMessageType = 'error';
        console.error(error);
      }
    });
  }

  clearMessage(): void {
    this.addressMessage = '';
    this.addressMessageType = '';
  }
}
