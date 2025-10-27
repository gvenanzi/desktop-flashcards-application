import {Component, OnInit} from '@angular/core';
import {ToggleThemeBtn} from '../../components/toggle-theme-btn/toggle-theme-btn';
import {FlashcardTestCard} from '../../components/flashcard-test-card/flashcard-test-card';
import {Flashcard} from '../../models/RDBFlashcard.schema';
import {RelationalDatabaseService} from '../../services/relational-database-service';
import {ActivatedRoute, Router} from '@angular/router';
import {BackNavigationBtn} from '../../components/back-navigation-btn/back-navigation-btn';

@Component({
  selector: 'app-flashcards-test-page',
  imports: [
    ToggleThemeBtn,
    FlashcardTestCard,
    BackNavigationBtn
  ],
  templateUrl: './flashcards-test-page.html',
  standalone: true,
  styleUrl: './flashcards-test-page.css'
})
export class FlashcardsTestPage implements OnInit {

  idCollectionPathParameter: number | null = null;
  flashcardList: Flashcard[] = []
  currentFlashcardIndex: number = 0;
  rights: number = 0

  constructor(private databaseService: RelationalDatabaseService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  public async ngOnInit(): Promise<void> {
    this.idCollectionPathParameter = Number.parseInt(<string>this.activatedRoute.snapshot.paramMap.get('id'));
    const currentPath = this.router.url;
    if (this.idCollectionPathParameter) {
      if (currentPath.includes('test-wrongs')) {
        this.flashcardList = await this.databaseService.getLastWrongFlashcardsByCollection(this.idCollectionPathParameter);
      } else if (currentPath.includes('test')) {
        this.flashcardList = await this.databaseService.getFlashcardsByCollection(this.idCollectionPathParameter);
      }
      this.flashcardList = this.flashcardList.sort(() => Math.random() - 0.5);
    }
  }

  public async updateFlashcard(successfulGuess: boolean): Promise<void> {
    const updateStatus = await this.databaseService.updateFlashcardsLastTimeGuess(this.flashcardList[this.currentFlashcardIndex].id, successfulGuess);
    if(updateStatus){
      this.rights += successfulGuess ? 1 : 0;
      if((this.currentFlashcardIndex + 1) >= this.flashcardList.length) {
        this.saveTestAndLeave();
      } else {
        this.currentFlashcardIndex+=1;
      }
    }
  }

  public async saveTestAndLeave(): Promise<void> {
    if (this.currentFlashcardIndex > 0) {
      const wrongs = this.flashcardList.length - this.rights;
      const savedTestId = await this.databaseService.addTest(new Date().toISOString(), this.rights, wrongs, this.flashcardList[this.currentFlashcardIndex].collectionId);
    }
    this.router.navigate(['/collection', this.flashcardList[this.currentFlashcardIndex].collectionId]);
  }

}
