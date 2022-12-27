import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private element = document.querySelector('#theme');

  constructor() {

    const url = localStorage.getItem('theme') || './assets/css/colors/default.css';
    this.element?.setAttribute('href', url);

  }

  changeTheme(theme: string) {

    const url = `./assets/css/colors/${theme}.css`
    this.element?.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();

  }

  checkCurrentTheme() {

    const links =  document.querySelectorAll('.selector');

    links.forEach(x => {
      x.classList.remove('working');

      const btnTheme = x.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;

      const currentTheme = this.element?.getAttribute('href');

      if (btnThemeUrl === currentTheme) {
        x.classList.add('working');
      }

    });

  }
}
