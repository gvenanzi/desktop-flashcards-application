import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-flashcard-card',
  imports: [],
  templateUrl: './flashcard-card.html',
  standalone: true,
  styleUrl: './flashcard-card.css'
})
export class FlashcardCard {

  @Input({required: true}) question: string = '';
  @Output() onModify = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<void>();

  public onModifyClick(): void {
    this.onModify.emit();
  }

  public onDeleteClick(): void {
    this.onDelete.emit();
  }
}
