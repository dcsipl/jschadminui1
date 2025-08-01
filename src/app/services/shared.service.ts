import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private showPreviewSubject = new BehaviorSubject<boolean>(false);
  showPreview$ = this.showPreviewSubject.asObservable();

  private previewImageSubject = new BehaviorSubject<any>(null);
  previewImage$ = this.previewImageSubject.asObservable();

  triggerPreview(show: boolean): void {
    this.showPreviewSubject.next(show);
  }

  setPreviewImage(image: any): void {
    this.previewImageSubject.next(image);
  }
}
