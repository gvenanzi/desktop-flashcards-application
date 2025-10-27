import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-back-navigation-btn',
  imports: [
    NgClass
  ],
  templateUrl: './back-navigation-btn.html',
  standalone: true,
  styleUrl: './back-navigation-btn.css'
})
export class BackNavigationBtn {

  @Output() onBackClicked = new EventEmitter<void>();
  @Input({required: false}) btnLabel: string = 'Indietro';
  @Input({required: false}) alertStyle: boolean = false;

  public onClick(): void {
    this.onBackClicked.emit();
  }
}
