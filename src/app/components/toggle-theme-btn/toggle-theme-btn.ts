import { Component } from '@angular/core';
import {TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-toggle-theme-btn',
  imports: [
    TitleCasePipe
  ],
  templateUrl: './toggle-theme-btn.html',
  standalone: true,
  styleUrl: './toggle-theme-btn.css'
})
export class ToggleThemeBtn {

  theme: string | null = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';

  public toggleTheme(): void {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      this.theme = 'dark';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      this.theme = 'light';
    }
  }
}
