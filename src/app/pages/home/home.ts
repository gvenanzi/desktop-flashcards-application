import {Component, OnInit} from '@angular/core';
import {FlashcardCollectionCard} from '../../components/flashcard-collection-card/flashcard-collection-card';
import {ToggleThemeBtn} from '../../components/toggle-theme-btn/toggle-theme-btn';
import {Router, RouterLink} from '@angular/router';
import {RelationalDatabaseService} from '../../services/relational-database-service';
import {Collection} from '../../models/RDBFlashcard.schema';

@Component({
  selector: 'app-home',
  imports: [
    FlashcardCollectionCard,
    ToggleThemeBtn,
    RouterLink
  ],
  templateUrl: './home.html',
  standalone: true,
  styleUrl: './home.css'
})
export class Home implements OnInit {

  data : Collection[] = [];

  constructor(private databaseService: RelationalDatabaseService, private router: Router) {
  }

  public async ngOnInit(): Promise<void> {
    this.data = await this.databaseService.getCollections();
  }
}
