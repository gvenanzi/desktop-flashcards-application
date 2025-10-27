import { Component } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {ToggleThemeBtn} from '../../components/toggle-theme-btn/toggle-theme-btn';
import {NgClass} from '@angular/common';
import {RelationalDatabaseService} from '../../services/relational-database-service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertBanner, AlertTypes} from '../../components/alert-banner/alert-banner';

@Component({
  selector: 'app-create-flashcard-page',
  imports: [
    ToggleThemeBtn,
    ReactiveFormsModule,
    NgClass,
    AlertBanner
  ],
  templateUrl: './create-flashcard-page.html',
  standalone: true,
  styleUrl: './create-flashcard-page.css'
})
export class CreateFlashcardPage {

  idPathParameter: string;
  flashcardForm = new FormGroup({
    question: new FormControl('', [Validators.required, Validators.minLength(3)]),
    answer: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });
  showAlert: boolean = false;
  alertType: AlertTypes | undefined;
  alertTitle: string | undefined;
  alertMessage: string | undefined;

  constructor(private databaseService: RelationalDatabaseService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.idPathParameter = this.activatedRoute.snapshot.paramMap.get('id') ?? '0'; // todo parsare ad intero l'id nel path altrimenti gestirlo
  }

  public onSubmit(): void {
    if (this.flashcardForm.valid) {
      const question = this.flashcardForm.value.question ?? '';
      const answer = this.flashcardForm.value.answer ?? '';
      this.databaseService.addFlashcard(question, answer, Number.parseInt(this.idPathParameter));
      this.router.navigate(['/collection', this.idPathParameter]);
    } else {
      this.showAlert = true;
      this.alertType = AlertTypes.Warning;
      this.alertTitle = 'Attenzione!';
      this.alertMessage = 'Compila tutti i campi e utilizza almeno 3 caratteri per ciascun campo.';
    }
  }

  public onBackBtnClicked(): void {
    this.router.navigate(['/collection', this.idPathParameter]);
  }

  public closeAlert(): void {
    this.showAlert = false;
    this.alertType = undefined;
    this.alertTitle = undefined;
    this.alertMessage = undefined;
  }
}
