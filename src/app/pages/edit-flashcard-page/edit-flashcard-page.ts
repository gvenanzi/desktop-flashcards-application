import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ToggleThemeBtn} from '../../components/toggle-theme-btn/toggle-theme-btn';
import {NgClass} from '@angular/common';
import {RelationalDatabaseService} from '../../services/relational-database-service';
import {ActivatedRoute, Router} from '@angular/router';
import {Flashcard} from '../../models/RDBFlashcard.schema';
import {AlertBanner, AlertTypes} from '../../components/alert-banner/alert-banner';

@Component({
  selector: 'app-edit-flashcard-page',
  imports: [
    ReactiveFormsModule,
    ToggleThemeBtn,
    NgClass,
    AlertBanner
  ],
  templateUrl: './edit-flashcard-page.html',
  standalone: true,
  styleUrl: './edit-flashcard-page.css'
})
export class EditFlashcardPage implements OnInit{

  flashcardIdPathParameter: number;
  collectionIdPathParameter: number;
  flashcard: Flashcard | undefined;
  flashcardForm = new FormGroup({
    question: new FormControl('', [Validators.required, Validators.minLength(3)]),
    answer: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });
  showAlert: boolean = false;
  alertType: AlertTypes | undefined;
  alertTitle: string | undefined;
  alertMessage: string | undefined;

  constructor(private databaseService: RelationalDatabaseService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.flashcardIdPathParameter = Number.parseInt(<string>this.activatedRoute.snapshot.paramMap.get('flashcardId'));
    this.collectionIdPathParameter = Number.parseInt(<string>this.activatedRoute.snapshot.paramMap.get('collectionId'));
  }

  public async ngOnInit(): Promise<void> {
    this.flashcard = await this.databaseService.getFlashcardById(this.flashcardIdPathParameter);
    if (this.flashcard) {
      this.flashcardForm.patchValue({
        question: this.flashcard.question,
        answer: this.flashcard.answer
      });
    }
  }

  public async onSubmit(): Promise<void> {
    if (this.flashcardForm && this.flashcardForm.valid) {
      const question = this.flashcardForm.value.question ?? '';
      const answer = this.flashcardForm.value.answer ?? '';
      const fileChanged = await this.databaseService.updateFlashcardsQuestionAndAnswer(this.flashcard!.id, question, answer);
      if(fileChanged > 0) {
        this.router.navigate(['/collection', this.collectionIdPathParameter, 'flashcardList']);
      }
      else {
        this.showAlert = true;
        this.alertType = AlertTypes.Error;
        this.alertTitle = 'Qualcosa è andato storto!';
        this.alertMessage = "L'operazione di modifica non è andata a buon fine.";
      }
    } else {
      this.showAlert = true;
      this.alertType = AlertTypes.Warning;
      this.alertTitle = 'Attenzione!';
      this.alertMessage = 'Compila tutti i campi e utilizza almeno 3 caratteri per ciascun campo.';
    }
  }

  public onBackBtnClicked(): void {
    this.router.navigate(['/collection', this.collectionIdPathParameter, 'flashcardList']);
  }

  public closeAlert(): void {
    this.showAlert = false;
    this.alertType = undefined;
    this.alertTitle = undefined;
    this.alertMessage = undefined;
  }
}
