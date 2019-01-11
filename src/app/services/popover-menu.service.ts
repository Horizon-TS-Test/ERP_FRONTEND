import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopoverMenuService {
  private showModalMenuSub = new BehaviorSubject<boolean>(null);
  showModalMenu$: Observable<boolean> = this.showModalMenuSub.asObservable();

  constructor() { }

  /**
   * METODO PARA ENVIAR LA SOLICITUD DE MOSTRAR U OCULTAR EL MENU MODAL
   * @param show 
   */
  public showModalMenu() {
    this.showModalMenuSub.next(true);
  }
}
