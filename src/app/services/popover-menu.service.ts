import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopoverMenuService {
  private showModalMenuSub = new BehaviorSubject<boolean>(null);
  showModalMenu$: Observable<boolean> = this.showModalMenuSub.asObservable();

  private onClickSubmenuOpSub = new BehaviorSubject<{ windowId: string, submenuAction: number }>(null);
  onClickSubmenuOp$: Observable<{ windowId: string, submenuAction: number }> = this.onClickSubmenuOpSub.asObservable();

  constructor() { }

  /**
   * METODO PARA ENVIAR LA SOLICITUD DE MOSTRAR U OCULTAR EL MENU MODAL
   * @param show 
   */
  public showModalMenu() {
    this.showModalMenuSub.next(true);
  }

  /**
   * METODO PARA ENVIAR LA SOLICITUD DE EJECUTAR LA ACION DE LA OPCION DEL SUBMENU
   * @param show 
   */
  public onClickModalSubmenuOption(submenu: { windowId: string, submenuAction: number }) {
    this.onClickSubmenuOpSub.next(submenu);
  }
}
