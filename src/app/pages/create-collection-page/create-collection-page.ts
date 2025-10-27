import { Component } from '@angular/core';
import {ToggleThemeBtn} from '../../components/toggle-theme-btn/toggle-theme-btn';
import {FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {RelationalDatabaseService} from '../../services/relational-database-service';
import {AlertBanner, AlertTypes} from "../../components/alert-banner/alert-banner";

@Component({
  selector: 'app-create-collection-page',
    imports: [
        ToggleThemeBtn,
        ReactiveFormsModule,
        NgClass,
        RouterLink,
        AlertBanner
    ],
  templateUrl: './create-collection-page.html',
  standalone: true,
  styleUrl: './create-collection-page.css'
})
export class CreateCollectionPage {

  flashcardsCollectionForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(60), Validators.minLength(3)]),
  });
  showAlert: boolean = false;
  alertType: AlertTypes | undefined;
  alertTitle: string | undefined;
  alertMessage: string | undefined;

  constructor(private databaseService: RelationalDatabaseService, private router: Router) {
  }

  public async onSubmit(): Promise<void> {
    if (!this.flashcardsCollectionForm.valid) {
      this.showAlert = true;
      this.alertType = AlertTypes.Warning;
      this.alertTitle = 'Attenzione!';
      this.alertMessage = 'Compila tutti i campi e utilizza almeno 3 caratteri per ciascun campo.';
    } else {
      try {
        // @ts-ignore
        await this.databaseService.addCollection(this.flashcardsCollectionForm.get('title')!.value, this.flashcardsCollectionForm.get('description')!.value);
      } catch (e) {
        // todo fai comparire un banner che segnala l'errore
      }
      this.router.navigate(['/']);
    }
  }

  public closeAlert(): void {
    this.showAlert = false;
    this.alertType = undefined;
    this.alertTitle = undefined;
    this.alertMessage = undefined;
  }
}
