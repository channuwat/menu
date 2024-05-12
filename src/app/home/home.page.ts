import { Component } from '@angular/core';
import menu from '../menu-data'
import { ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { CartComponent } from './cart/cart.component';

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

  async onCart() {
    let cart = this.api.getStore('cart') ?? []
    const modal = await this.modalCtrl.create({
      component: CartComponent,
      componentProps: { cart: cart }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
  }


  cartValues() {
    let cart = this.api.getStore('cart') ?? []
    let count: number = 0
    for (let c of cart) {
      count += (c.count - 0)
    }
    return count
  }
}
