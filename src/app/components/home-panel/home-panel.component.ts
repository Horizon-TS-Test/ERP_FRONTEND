import { Component, OnInit, OnDestroy } from '@angular/core';
import { HorizonSwitchInputInterface } from '../../interfaces/horizon-switch-in.interface';
import { Subscription } from 'rxjs';
import { TabWindowService } from 'src/app/services/tab-window.service';
import { Tab } from 'src/app/interfaces/tab.interface';
import { ContextMenu } from 'src/app/interfaces/context-menu.interface';
import { MainPanelOption } from 'src/app/interfaces/main-pan-option';
import mainPanel from 'src/app/data/main-panel';

const ADD_ENTERPRISE = 1;
const CHANGE_ENTERPRISE = 2;
const CONFIGURATIONS = 3;

@Component({
  selector: 'home-panel',
  templateUrl: './home-panel.component.html',
  styleUrls: ['./home-panel.component.scss']
})
export class HomePanelComponent implements OnInit, OnDestroy {
  private subscriptor: Subscription;
  private delSubs: Subscription;
  private enterpriseMainOp: MainPanelOption;

  public tabData: Tab[];
  public isAble: boolean;
  public subsStyle: string;
  public switchInput: HorizonSwitchInputInterface;
  public contextMenu: ContextMenu;

  constructor(
    private _tabWindowService: TabWindowService
  ) {
    this.enterpriseMainOp = mainPanel[0];
    this.tabData = [];
    this.defineContextMenu();
  }

  ngOnInit() {
    this.listenToTabUpdates();
  }

  /**
   * METODO PARA ESCUCHAR CUANDO UNA VENTANA SE HA MINIMIZADO Y DEBE SER CREADA UNA PESTAÑA ASOCIADA A LA MISMA
   */
  private listenToTabUpdates() {
    this.subscriptor = this._tabWindowService.updateTab$.subscribe((tabs: Tab[]) => {
      if (tabs) {
        this.tabData = tabs;
      }
    });
  }

  /**
   * METODO PARA DEFINIR LAS OPCIONES DE UN MENU DE CONTEXTO:
   */
  private defineContextMenu() {
    this.contextMenu = {
      hasButton: true,
      options: [
        {
          id: 'context-op-1',
          icon: this.enterpriseMainOp.icon,
          text: this.enterpriseMainOp.optionName,
          action: ADD_ENTERPRISE,
        },
        {
          id: 'context-op-2',
          icon: 'undo',
          text: 'Cambiar de Empresa',
          action: CHANGE_ENTERPRISE
        },
        {
          id: 'context-op-3',
          icon: 'cog',
          text: 'Configuraciones',
          action: CONFIGURATIONS
        },
      ]
    };
  }

  /**
   * METODO PARA RECARGAR LA APLICACIÓN
   */
  public reloadApp(event: any) {
    event.preventDefault();
    location.href = '/';
  }

  /**
   * METODO PARA MAXIMIZAR UNA VENTANA HECHA PESTAÑA
   * @param event ID DE LA PESTAÑA-VENTANA
   */
  public maximizeWindow(event: string) {
    this._tabWindowService.maximizeWindow(event);
  }

  /**
   * METODO PARA CERRAR UNA VENTANA Y UN TAB
   * @param event ID DE LA PESTAÑA-VENTANA
   */
  public closeWinTab(event: string) {
    this._tabWindowService.closeWindow(event);
  }

  /**
   * METODO PARA PREVENIR EL CLICK DERECHO EN LOS ENLACES:
   * @param event
   */
  public onRightClick(event: any) {
    event.preventDefault();
  }

  /**
   * METODO PARA OBTENER LA ACCION A REALIZAR AL DAR CLICK EN LA OPCION DEL MENU DE CONTEXTO
   */
  public contextAction(action: number) {
    switch (action) {
      case ADD_ENTERPRISE:
        this._tabWindowService.loadOrMaximizeWindow(this.enterpriseMainOp);
        break;
      case CHANGE_ENTERPRISE:
        console.log("CHANGE ENTERPRISE");
        break;
      case CONFIGURATIONS:
        console.log("CONFIGURATIONS");
        break;
    }
  }

  ngOnDestroy() {
    this.subscriptor.unsubscribe();
    this.delSubs.unsubscribe();
  }
}