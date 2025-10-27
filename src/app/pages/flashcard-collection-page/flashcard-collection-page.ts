import {Component, OnInit} from '@angular/core';
import {DatePipe, NgClass, TitleCasePipe} from '@angular/common';
import {ToggleThemeBtn} from '../../components/toggle-theme-btn/toggle-theme-btn';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {RelationalDatabaseService} from '../../services/relational-database-service';
import {Collection, Flashcard, Test} from '../../models/RDBFlashcard.schema';
import {BackNavigationBtn} from '../../components/back-navigation-btn/back-navigation-btn';

@Component({
  selector: 'app-flashcard-collection-page',
  imports: [
    TitleCasePipe,
    ToggleThemeBtn,
    RouterLink,
    BackNavigationBtn,
    DatePipe,
    NgClass
  ],
  templateUrl: './flashcard-collection-page.html',
  standalone: true,
  styleUrl: './flashcard-collection-page.css'
})
export class FlashcardCollectionPage implements OnInit {

  idPathParameter: number = 0;
  collection: Collection | null = null;
  flashcardList: Flashcard[] = [];
  collectionTestList: Test[] = [];
  lastCollectionTest: Test | null = null;

  constructor(private databaseService: RelationalDatabaseService, private route: ActivatedRoute, private router: Router) {
  }

  public async ngOnInit(): Promise<void> {
    this.idPathParameter = Number.parseInt(<string>this.route.snapshot.paramMap.get('id'));
    if(this.idPathParameter){
      this.collection = await this.databaseService.getCollectionById(this.idPathParameter);
      this.flashcardList = await this.databaseService.getFlashcardsByCollection(this.collection.id);
      this.collectionTestList = await this.databaseService.getTestsByCollection(this.collection.id);
      this.lastCollectionTest = await this.databaseService.getLastTestByCollection(this.collection.id);
      console.log(this.lastCollectionTest)
      console.log(this.collectionTestList)
    }
  }

  public getWrongGuessedFlashcards(): Flashcard[] {
    return this.flashcardList?.filter(card => !card.lastTimeHasBeenAnswered && card.lastTimeHasBeenAnswered !== null);
  }

  public getLastTestScoreRate(): string {
    if(this.lastCollectionTest) {
      return (this.lastCollectionTest?.rights / (this.lastCollectionTest?.rights + this.lastCollectionTest?.wrongs) * 100).toFixed(2);
    }
    return '-';
  }

  public onBackClick(): void {
    this.router.navigate(['']);
  }

  public reTestCurrentWrongCards(): void {
    if (this.collection && this.getWrongGuessedFlashcards().length > 0) {
      this.router.navigate(['/collection', this.collection.id, 'test-wrongs']);
    }
  }
}
