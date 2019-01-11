import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tab } from 'src/app/interfaces/tab.interface';

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

  constructor() {
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
}
