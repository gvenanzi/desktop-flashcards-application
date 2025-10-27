import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  imports: [],
  templateUrl: './confirmation-modal.html',
  standalone: true,
  styleUrl: './confirmation-modal.css'
})
export class ConfirmationModal {

  @Output() onConfirm = new EventEmitter<void>();
  @Output() onAnnul = new EventEmitter<void>();

  public confirm(): void {
    this.onConfirm.emit();
  }

  public annul(): void {
    this.onAnnul.emit();
  }
}
