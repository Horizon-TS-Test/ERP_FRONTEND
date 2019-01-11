import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WindowTab } from '../interfaces/window.interface';
import { DynaContentService } from './dyna-content.service';
import { MainPanelOption } from '../interfaces/main-pan-option';
import { Title } from '../interfaces/title.interface';
import { Tab } from '../interfaces/tab.interface';

@Injectable({
  providedIn: 'root'
})
export class TabWindowService {
  private updateTabSub = new BehaviorSubject<Tab[]>(null);
  updateTab$: Observable<Tab[]> = this.updateTabSub.asObservable();

  private forceMinimizeWinSub = new BehaviorSubject<boolean>(null);
  forceMinimizeWin$: Observable<boolean> = this.forceMinimizeWinSub.asObservable();

  private openWinByIdSub = new BehaviorSubject<string>(null);
  openWinById$: Observable<string> = this.openWinByIdSub.asObservable();
  
  private openNewWindowSub = new BehaviorSubject<string>(null);
  openNewWindow$: Observable<string> = this.openNewWindowSub.asObservable();

  public windowTabList: WindowTab[];
  public tabList: Tab[];

  constructor(
    private _dynaContentService: DynaContentService
  ) {
    this.windowTabList = [];
    this.tabList = [];
  }

  /**
   * METODO PARA NOTIFICAR ACERCA DE UNA VENTANA QUE SE HA MINIMIZADO
   * @param windowData DATOS DE LA VENTANA MINIMIZADA
   */
  public makeWindowTab(windowData: WindowTab) {
    let commingWinIndex = this.windowTabList.findIndex(winTab => winTab.mainPanOptionData.id == windowData.mainPanOptionData.id);
    if (commingWinIndex == -1) {
      this.windowTabList.push(windowData);
      this.tabList.push({ id: windowData.mainPanOptionData.id, title: windowData.mainPanOptionData.optionName, icon: windowData.mainPanOptionData.icon, customIcon: windowData.mainPanOptionData.customIcon, opened: true });
      this.updateTabSub.next(this.tabList);
    }
    else {
      this.tabList[commingWinIndex].maximized = false;
    }
  }

  /**
   * METODO PARA NOTIFICAR ACERCA DE UNA VENTANA QUE SE HA CERRADO
   * @param windowData DATOS DE LA VENTANA CERRADA
   */
  public removeTab(mainOptionId: string) {
    let removedWinIndex = this.windowTabList.findIndex(winTab => winTab.mainPanOptionData.id == mainOptionId);
    if (removedWinIndex != -1) {
      this.windowTabList.splice(removedWinIndex, 1);
      this.tabList.splice(removedWinIndex, 1);
    }
    this.updateTabSub.next(this.tabList);
  }

  /**
   * METODO PARA MAXIMIZAR UNA VENTANA HECHA PESTAÑA
   * @param windowId ID DE LA PESTAÑA-VENTANA
   */
  public maximizeWindow(windowId: string) {
    let winTabindex = this.windowTabList.findIndex(winTab => winTab.mainPanOptionData.id == windowId);
    this.windowTabList[winTabindex].componentInstance.maximizePopOver();
    for (let i = 0; i < this.tabList.length; i++) {
      if (i == winTabindex) {
        this.tabList[i].maximized = true;
      }
      else {
        this.tabList[i].maximized = false;
      }
    }
    this.updateTabSub.next(this.tabList);
  }

  /**
   * METODO PARA CERRAR UNA VENTANA Y UN TAB
   * @param windowId ID DE LA PESTAÑA-VENTANA
   */
  public closeWindow(windowId: string) {
    let winTabindex = this.windowTabList.findIndex(winTab => winTab.mainPanOptionData.id == windowId);
    this.windowTabList[winTabindex].componentInstance.closePopOver();
  }

  /**
   * METODO PARA ABRIR O MAXIMIZAR UNA VENTANA
   * @param mainOption 
   */
  public loadOrMaximizeWindow(mainOption: MainPanelOption) {
    let title: Title = { text: mainOption.title, icon: mainOption.icon, customIcon: mainOption.customIcon, modalTitle: true };
    let newWinIndex = this.windowTabList.findIndex(winTab => winTab.mainPanOptionData.id == mainOption.id);
    if (newWinIndex == -1) {
      this._dynaContentService.loadDynaWindow({ contentType: mainOption.openContent, contentData: { title: title, mainPanOption: mainOption, closable: false } });
      //NEXT IS TO NOTIFY POPOVER MENU TO KICK THE CURRENT OPENED WINDOW OUT FROM ITS LIST OF NO-OPENED WINDOWS TABS
      this.onOpenNewWindow(mainOption.id);
      ////
    }
    else {
      this.maximizeWindow(mainOption.id);
    }
  }

  /**
   * METODO PARA CAMBIAR DE VENTANA AL DAR CLICK EN OTRA PESTAÑA
   */
  public changeTabWindow(openWindowById: string) {
    this.forceMinimizeWinSub.next(true);
    this.openWinByIdSub.next(openWindowById);
  }

  /**
   * METODO PARA NOTIFICAR LA APERTURA DE UNA NUEVA VENTA
   */
  public onOpenNewWindow(justOpenedWinId: string) {
    this.openNewWindowSub.next(justOpenedWinId);
  }

  /**
   * METODO PARA CERRAR UNA VENTANA Y UN TAB Y LUEGO MAXIMIZAR OTRA VENTANA QUE ESTE MINIMIZADA
   */
  public changeTabOnCloseOne(closedTabId: string, changedTabId:string) {
    this.closeWindow(closedTabId);
    this.maximizeWindow(changedTabId);
  }

}
