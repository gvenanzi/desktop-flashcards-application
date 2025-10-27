import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-alert-banner',
  imports: [
    NgClass
  ],
  templateUrl: './alert-banner.html',
  standalone: true,
  styleUrl: './alert-banner.css'
})
export class AlertBanner {

  @Input({required: true}) bannerType: AlertTypes | undefined;
  @Input({required: true}) title: string | undefined;
  @Input({required: true}) message: string | undefined;
  @Output() onCloseBanner = new EventEmitter<void>();

  protected readonly AlertTypes = AlertTypes;

  public onCloseClick(): void {
    this.onCloseBanner.emit();
  }
}

export enum AlertTypes {
  Success,
  Error,
  Warning
}
