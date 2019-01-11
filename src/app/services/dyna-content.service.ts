import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DynaContent } from '../interfaces/dyna-content.interface';

@Injectable({
  providedIn: 'root'
})
export class DynaContentService {
  private dynaWindowSubject = new BehaviorSubject<DynaContent>(null);
  dynaWindowData$: Observable<DynaContent> = this.dynaWindowSubject.asObservable();
  
  private dynaModalSubject = new BehaviorSubject<DynaContent>(null);
  dynamodalData$: Observable<DynaContent> = this.dynaModalSubject.asObservable();
  
  private removeSubject = new BehaviorSubject<boolean>(false);
  removeDynaCont$: Observable<boolean> = this.removeSubject.asObservable();

  constructor() { }

  /**
   * METODO PARA NOTIFICAR AL COMPONENTE SUSCRITO AL OBSERVABLE QUE SE REQUIERE ABRIR UNA VENTANA DINAMICA
   * @param dynaCont DATOS A INYECTAR EN LA VENTANA DINAMICA
   */
  public loadDynaWindow(dynaCont: DynaContent) {
    this.dynaWindowSubject.next(dynaCont);
  }

  /**
   * METODO PARA NOTIFICAR AL COMPONENTE SUSCRITO AL OBSERVABLE QUE SE REQUIERE ABRIR UN MODAL DINAMICO
   * @param dynaCont DATOS A INYECTAR AL MODAL DINAMICO
   */
  public loadDynaModal(dynaCont: DynaContent) {
    this.dynaModalSubject.next(dynaCont);
  }

  /**
   * METODO PARA MODIFICAR EL VALOR DEL DATO QUE EL OBSERVABLE ESTÁ ESCUCHANDO, PARA POSTERIOR A ELLO
   * NOTIFICAR A LOS QUE ESTAN SUSCRITOS AL OBSERVABLE.
   * METODO UTILIZADO PARA HACER BROADCAST A TODOS LOS COMPONENTES MODALES QUE ESTÉN ESCUCHANDO.
   * @param modalData DATO A NOTIFICAR DESPUÉS DE HABERLO RECIBIDO
   */
  public removeDynaContent(removeIt: boolean) {
    this.removeSubject.next(removeIt);
  }
}
