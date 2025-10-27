import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-flashcard-test-card',
  imports: [],
  templateUrl: './flashcard-test-card.html',
  standalone: true,
  styleUrl: './flashcard-test-card.css'
})
export class FlashcardTestCard {

  @Input({required: true}) question: string | undefined;
  @Input({required: true}) answer: string | undefined;
  isAnswerVisible: boolean = false;

  public toggleAnswerVisibility(): void {
    this.isAnswerVisible = !this.isAnswerVisible;
  }
}
