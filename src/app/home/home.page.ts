import { Component } from '@angular/core';
import menu from '../menu-data'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  menuData: any[] = []
  constructor() {
    this.menuData = menu
    console.log(menu);

  }

}
