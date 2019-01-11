import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContextMenu } from 'src/app/interfaces/context-menu.interface';

const SHOW_CLASS = 'context-show';

@Component({
  selector: 'context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {
  @Input() contextData: ContextMenu;
  @Output() onClickOption: EventEmitter<number>;
  public showContextMenu: boolean;
  public contextShow: string;

  constructor() {
    this.showContextMenu = false;
    this.onClickOption = new EventEmitter<number>();
  }

  ngOnInit() {
  }

  /**
   * METODO PARA MOSTRAR U OCULTAR EL MENU DE CONTEXTO AL DAR CLICK EN EL BOTON DE APERTURA
   * @param event 
   */
  public showContext(event: any) {
    event.preventDefault();
    if (!this.showContextMenu) {
      this.contextShow = SHOW_CLASS;
    }
    else {
      this.contextShow = "";
    }
    this.showContextMenu = !this.showContextMenu;
  }

  /**
   * METODO PARA OCULTAR EL MENU DE CONTEXTO AL DAR CLICK EN EL BOTON DE APERTURA
   * @param event 
   */
  public onBlur(event: any) {
    if (this.showContextMenu) {
      this.contextShow = "";
      this.showContextMenu = false;
    }
  }

  /**
   * METODO PARA CAPTURAR EL EVENTO DE CLICK DE LA OPCION DEL CONTEXT MENU
   * @param event 
   * @param optionIndex 
   */
  public onClickContOption(event: any, optionIndex) {
    event.preventDefault();
    this.onClickOption.emit(this.contextData.options[optionIndex].action);
  }
}
