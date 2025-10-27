import { Component, Input } from '@angular/core';
import {RouterLink} from '@angular/router';
import {Collection} from '../../models/RDBFlashcard.schema';

@Component({
  selector: 'app-flashcard-collection-card',
  imports: [
    RouterLink
  ],
  templateUrl: './flashcard-collection-card.html',
  standalone: true,
  styleUrl: './flashcard-collection-card.css'
})
export class FlashcardCollectionCard {

  @Input({required: true}) collection: Collection | undefined;
}
