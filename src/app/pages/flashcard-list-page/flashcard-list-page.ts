import {Component, OnInit} from '@angular/core';
import {ToggleThemeBtn} from '../../components/toggle-theme-btn/toggle-theme-btn';
import {FlashcardCard} from '../../components/flashcard-card/flashcard-card';
import {Collection, Flashcard} from '../../models/RDBFlashcard.schema';
import {RelationalDatabaseService} from '../../services/relational-database-service';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationModal} from '../../components/confirmation-modal/confirmation-modal';
import {BackNavigationBtn} from '../../components/back-navigation-btn/back-navigation-btn';

@Component({
  selector: 'app-flashcard-list-page',
  imports: [
    ToggleThemeBtn,
    FlashcardCard,
    ConfirmationModal,
    BackNavigationBtn
  ],
  templateUrl: './flashcard-list-page.html',
  standalone: true,
  styleUrl: './flashcard-list-page.css'
})
export class FlashcardListPage implements OnInit {

  idPathParameter: string | null;
  collection: Collection | undefined;
  flashcardList: Flashcard[] | undefined;
  showConfirmationModal: boolean = false;
  private flashcardToDelete: Flashcard | null = null;

  constructor(private databaseService: RelationalDatabaseService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.idPathParameter = this.activatedRoute.snapshot.paramMap.get('id'); // todo parsare ad intero l'id nel path altrimenti gestirlo
  }

  public async ngOnInit(): Promise<void> {
    if(this.idPathParameter){
      this.collection = await this.databaseService.getCollectionById(Number.parseInt(this.idPathParameter));
      this.flashcardList = await this.databaseService.getFlashcardsByCollection(Number.parseInt(this.idPathParameter));
    }
  }

  public onModifyClick(flashcard: Flashcard): void {
    this.router.navigate(['/collection', this.collection?.id, 'editFlashcard', flashcard.id])
  }

  public onDeleteClick(flashcard: Flashcard): void {
    this.showConfirmationModal = true;
    this.flashcardToDelete = flashcard;
  }

  public async deleteFlashcard(confirmation: boolean): Promise<void> {
    if (confirmation) {
      // delete confermata
      const deletedRows = await this.databaseService.deleteFlashcardsById(this.flashcardToDelete!.id);
      if (deletedRows) {
        this.flashcardList = this.flashcardList?.filter(card => card.id !== this.flashcardToDelete?.id);
      }
    }
    this.flashcardToDelete = null;
    this.showConfirmationModal = false;
  }

  public onBackClick(): void {
    this.router.navigate(['/collection', this.idPathParameter]);
  }
}
