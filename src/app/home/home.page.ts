import { Component } from '@angular/core';
import menu from '../menu-data'
import { ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  menuData: any[] = []
  constructor(private modalCtrl: ModalController, private api: ApiService) {
    this.menuData = menu
  }

  addCart(key: number, item: any) {
    let data: any = {
      'id': key + '' + item.id,
      'img': item.img,
      'name': item.name,
      'count': 1,
      'remark': ''
    }

    let store = this.api.getStore('cart') ?? []
    let _cart = store.filter((f: any) => {
      return f.id == data.id
    })

    if (_cart[0]) {
      for (let f of store) {
        if (f.id == data.id) {
          f.count++
        }
      }
      this.api.setStore('cart', store)
    } else {
      store.push(data)
      this.api.setStore('cart', store)
    }
  }
}
