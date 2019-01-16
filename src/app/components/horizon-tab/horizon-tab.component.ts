import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tab } from 'src/app/interfaces/tab.interface';
import { ContextMenu } from 'src/app/interfaces/context-menu.interface';

const SHOW_CLASS = 'context-show';

@Component({
  selector: 'horizon-tab',
  templateUrl: './horizon-tab.component.html',
  styleUrls: ['./horizon-tab.component.scss']
})
export class HorizonTabComponent implements OnInit {
  @Input() tabList: Tab[];
  @Input() verticalColumn: boolean;
  @Output() clickedTab: EventEmitter<string>;
  @Output() closedTab: EventEmitter<string>;

  public contextMenu: ContextMenu;
  public showContextMenu: boolean;
  public contextShow: string;

  constructor() {
    this.showContextMenu = false;
    this.clickedTab = new EventEmitter<string>();
    this.closedTab = new EventEmitter<string>();
  }

  ngOnInit() {
  }

  /**
   * METODO PARA DETECTAR EL EVENTO DE CLICK EN UNA PESTAÑA
   * @param event 
   * @param tabId
   */
  public onClickTab(event: any, tabId: string) {
    event.preventDefault();
    this.clickedTab.emit(tabId);
  }

  /**
   * METODO PARA DETECTAR EL EVENTO DE CLICK EN UNA PESTAÑA
   * @param event
   * @param tabId
   */
  public onCloseTab(event: any, tabId: string) {
    event.preventDefault();
    this.closedTab.emit(tabId);
  }

  /**
   * METODO PARA PREVENIR EL CLICK DERECHO EN LOS ENLACES:
   * @param event
   */
  public onRightClick(event: any) {
    event.preventDefault();
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
      setTimeout(() => {
        this.contextShow = "";
        this.showContextMenu = false;
      }, 150);
    }
  }
}
