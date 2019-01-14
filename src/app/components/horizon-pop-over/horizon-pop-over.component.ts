import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { DynaContent } from '../../interfaces/dyna-content.interface';
import { CONTENT_TYPES } from '../../config/content-type';
import { Subscription } from '../../../../node_modules/rxjs';
import { DynaContentService } from 'src/app/services/dyna-content.service';
import { TitleButton } from 'src/app/interfaces/title-btn.interface';
import { BTN_APPEARANCE } from 'src/app/config/button-appearance';
import { ACTION_TYPES } from 'src/app/config/action-types';
import { TabWindowService } from 'src/app/services/tab-window.service';
import { MainPanelOption } from 'src/app/interfaces/main-pan-option';
import { PopoverMenuService } from 'src/app/services/popover-menu.service';

@Component({
  selector: 'app-horizon-pop-over',
  templateUrl: './horizon-pop-over.component.html',
  styleUrls: ['./horizon-pop-over.component.scss']
})
export class HorizonPopOverComponent implements OnInit, OnDestroy {
  private subscriber: Subscription;
  private subscriberMin: Subscription;
  private secondaryContent: boolean;

  public _ref: any;
  public _selfInstance: any;
  public _dynaContent: DynaContent;
  public visibleClass: string;
  public backgroundClass: string;
  public contentTypes: any;
  public titleBtnList: TitleButton[];
  public isMinimized: boolean;

  constructor(
    private _dynaContentService: DynaContentService,
    private _tabWindowService: TabWindowService,
    private _popoverMenuService: PopoverMenuService
  ) {
    this.contentTypes = CONTENT_TYPES;
    this.titleBtnList = [
      { icon: 'close', btnType: BTN_APPEARANCE.no_border, btnAction: ACTION_TYPES.close },
      { icon: 'minus', btnType: BTN_APPEARANCE.no_border, btnAction: ACTION_TYPES.minimize }
    ]

    this.listenToClosePop();
    this.listenToMinimizePop();

    this.isMinimized = false;

  }

  ngOnInit() {
    setTimeout(() => {
      this.backgroundClass = "on"
      this.visibleClass = "is-visible"
    }, 100);
  }

  /**
   * METODO PARA ESCUCHAR LA PETICION DE CIERRE DEL POP OVER ESCOGIDO
   */
  private listenToClosePop() {
    this.subscriber = this._dynaContentService.removeDynaCont$.subscribe((closeIt: boolean) => {
      if (closeIt) {
        this.closePopOver();
      }
    });
  }

  /**
   * METODO PARA ESCUCHAR LA PETICION DE MINIMIZAR EL POP OVER ABIERTO ACTUALMENTE
   */
  private listenToMinimizePop() {
    this.subscriberMin = this._tabWindowService.forceMinimizeWin$.subscribe((minIt: boolean) => {
      if (minIt && this.isMinimized == false) {
        this.minimizePopOver();
      }
    });
  }

  /**
   * METODO PARA ELIMINAR LA REFERENCIA DE ESTE COMPONENTE DINÁMICO DENTRO DE TODA LA APP
   */
  private removeObject() {
    this._ref.destroy();
  }

  /**
   * METODO PARA DAR EL EFECTO DE ENCOGIMIENTO DEL POP OVER PARA LUEGO CERRARLO:
   */
  public closePopOver() {
    this.backgroundClass = ""
    this.visibleClass = ""

    this._tabWindowService.removeTab(this._dynaContent.contentData.mainPanOption.id);
    setTimeout(() => {
      this.removeObject();
    }, 300);
  }

  /**
   * METODO PARA CERRAR EL POP OVER AL DAR CLICK FUERA DEL MISMO:
   * @param event 
   */
  public onClickClose(event: any) {
    event.preventDefault();
    this.closePopOver();
  }

  /**
   * METODO PARA CERRAR EL POP OVER DESDE EL COMPONENTE HIJO USANDO EVENT EMITTER
   * @param $event VALOR DEL EVENT EMITTER
   */
  public closePopFromChild(event: boolean) {
    if (event) {
      this.closePopOver();
    }
  }

  /**
   * METODO PARA DAR EL EFECTO DE ENCOGIMIENTO DEL POP OVER PARA MINIMIZARLO,
   * ESTE METODO AÑADE EL POP OVER ACTUAL A UNA LISTA DE PESTAÑAS, CON EL FIN
   * DE LUEGO PODER ABRIRLO NUEVAMENTE
   */
  private minimizePopOver() {
    this.backgroundClass = ""
    this.visibleClass = ""

    this._tabWindowService.makeWindowTab({ componentInstance: this._selfInstance, mainPanOptionData: <MainPanelOption>this._dynaContent.contentData.mainPanOption });
    setTimeout(() => {
      this.isMinimized = true;
    }, 300);
  }

  /**
   * METODO PARA DAR EL EFECTO DE AGRANDAMIENTO DE UN POP OVER AL MOMENTO DE MAXIMIZAR UNA VENTANA:
   */
  public maximizePopOver() {
    this.isMinimized = false;
    setTimeout(() => {
      this.backgroundClass = "on"
      this.visibleClass = "is-visible"
    }, 200);
  }

  /**
   * METODO PARA SOLICITAR LA APERTURA DEL POPOVER MENU
   * @param event 
   */
  public openModalMenu(event: any) {
    event.preventDefault();
    this._popoverMenuService.showModalMenu();
  }

  /**
   * METODO PARA SABER QUE UN SUBMENU HA SIDO MOSTRADO Y QUE HAY QUE MOSTRAR EL BOTON ATRAS
   * @param event 
   */
  public onSecondContent(event: boolean) {
    setTimeout(() => {
      this.secondaryContent = true;
    }, 1000);
  }

  /**
   * METODO PARA CAPTURAR EL CLICK DEL BOTON ATRAS
   * @param event 
   */
  public hideSecondContent(event: any) {
    event.preventDefault();
    this.secondaryContent = false;
  }

  /**
   * METODO PARA MANIPULAR LA ACCION A REALIZAR AL DAR CLICK EN LOS BOTONES DE LA BARRA DE TITULO
   * @param action TIPO DE ACTION PRECONFIGURADA PROVENIENTE DEL EVENT EMITTER
   */
  public handleBtnClick(action: number) {
    switch (action) {
      case ACTION_TYPES.close:
        this.closePopOver();
        break;
      case ACTION_TYPES.minimize:
        this.minimizePopOver();
        break;
    }
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
    this.subscriberMin.unsubscribe();
  }
}
