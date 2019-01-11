import { Component, OnInit, OnDestroy } from '@angular/core';
import { Tab } from 'src/app/interfaces/tab.interface';
import { TabWindowService } from 'src/app/services/tab-window.service';
import { Subscription } from 'rxjs';
import { MainPanelOption } from 'src/app/interfaces/main-pan-option';
import mainPanel from 'src/app/data/main-panel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynaContentService } from 'src/app/services/dyna-content.service';
import { PopoverMenuService } from 'src/app/services/popover-menu.service';

@Component({
  selector: 'pop-over-menu',
  templateUrl: './pop-over-menu.component.html',
  styleUrls: ['./pop-over-menu.component.scss']
})
export class PopOverMenuComponent implements OnInit, OnDestroy {
  private subscriptor: Subscription;
  private subscrip: Subscription;
  private openNewWinSubscrip: Subscription;
  private showMenuSubscrip: Subscription;

  public showModalMenu: boolean;
  public showMenuCrystal: boolean;
  public openedTabData: Tab[];
  public mainPanOptions: MainPanelOption[];
  public noOpenedWindows: Tab[];

  public filterForm: FormGroup;
  public filtering: boolean;
  public openedTabFilter: Tab[];
  public windowsFilter: Tab[];
  public menuBtnClass: string;

  constructor(
    private formBuilder: FormBuilder,
    private _tabWindowService: TabWindowService,
    private _popoverMenuService: PopoverMenuService
  ) {
    this.defineForm();
    this.filtering = false;
    this.mainPanOptions = mainPanel;
    this.openedTabData = [];
    this.openedTabFilter = [];

    this.menuBtnClass = "";
    this.showModalMenu = false;
    this.showMenuCrystal = false;
  }

  ngOnInit() {
    this.getWindowsMenu();
    this.listenToTabUpdates();
    this.listenToOpenNewWindow()
    this.listenToShowMenu();
    this.addNoOpenWin();
  }

  /**
   * METODO PARA DEFINIR EL FORM-GROUP PARA FILTRO DE TABS:
   */
  public defineForm() {
    this.filterForm = this.formBuilder.group({
      fcnFilter: [null, Validators.required]
    });
  }

  /**
   * METODO PARA CREAR UNA LISTA DE TABS EN BASE AL MENU DE VENTANAS 
   */
  private getWindowsMenu() {
    this.noOpenedWindows = [];
    this.windowsFilter = [];
    for (let option of this.mainPanOptions) {
      this.noOpenedWindows.push({ id: option.id, icon: option.icon, title: option.optionName, customIcon: option.customIcon });
    }
    this.windowsFilter = this.noOpenedWindows.slice();
  }

  /**
   * METODO PARA ESCUCHAR CUANDO UNA VENTANA SE HA MINIMIZADO Y DEBE SER CREADA UNA PESTAÑA ASOCIADA A LA MISMA
   */
  private listenToTabUpdates() {
    this.subscriptor = this._tabWindowService.updateTab$.subscribe((tabs: Tab[]) => {
      if (tabs) {
        this.openedTabData = tabs;
        this.openedTabFilter = this.openedTabData.slice();

        for (let tab of this.openedTabData) {
          for (let i = 0; i < this.noOpenedWindows.length; i++) {
            if (this.noOpenedWindows[i].id == tab.id) {
              this.noOpenedWindows.splice(i, 1);
            }
          }
        }
        this.windowsFilter = this.noOpenedWindows.slice();
      }
    });
  }

  /**
   * METODO PARA ESCUCHAR CUANDO UNA VENTANA SE HA ABIERTO POR PRIMERA VEZ,
   * DEBERA SER ELIMINADA DE LA LISTA DE TABS CERRADAS
   */
  private listenToOpenNewWindow() {
    this.openNewWinSubscrip = this._tabWindowService.openNewWindow$.subscribe((justOpenedWinID: string) => {
      if (justOpenedWinID) {
        let index = this.noOpenedWindows.findIndex(window => window.id == justOpenedWinID);
        if (index !== -1) {
          this.noOpenedWindows.splice(index, 1);
          this.windowsFilter = this.noOpenedWindows.slice();
        }
      }
    });
  }

  /**
   * METODO PARA ESCUCHAR LA PETICION DE MOSTRAR U OCULTAR EL MENU MODAL
   */
  private listenToShowMenu() {
    this.showMenuSubscrip = this._popoverMenuService.showModalMenu$.subscribe((showMenu: boolean) => {
      if (showMenu) {
        this.openModalMenu(null);
      }
    });
  }

  /**
   * METODO PARA ESCUCHAR CUANDO UNA VENTANA SE HA CERRADO Y DEBE APARECER EN EL MENÚ DE VENTANAS NO ABIERTAS
   */
  private addNoOpenWin() {
    this.subscrip = this._tabWindowService.addNoOpenWinPopMenu$.subscribe((add: boolean) => {
      if (add) {
        this.getWindowsMenu();
      }
    });
  }

  /**
   * METODO PARA ABRIR EL MENU DEL MODAL
   * @param event 
   */
  private openModalMenu(event: any) {
    if (event) {
      event.preventDefault();
    }
    this.showMenuCrystal = true;
    setTimeout(() => {
      this.showModalMenu = true;
    }, 100);
  }

  /**
   * METODO PARA CERRAR EL MENU DEL MODAL
   * @param event 
   */
  public closeModalMenu(event: any) {
    event.preventDefault();
    this.showModalMenu = false;
    setTimeout(() => {
      this.showMenuCrystal = false;
    }, 300);
  }

  /**
   * METODO PARA BUSCAR UN MENU VENTANA DENTRO DEL SUBMENU MODAL
   */
  public onSearch(event: any) {
    this.filtering = true;

    let filterText = this.filterForm.value.fcnFilter.toUpperCase();
    this.openedTabFilter = this.openedTabData.slice();
    this.windowsFilter = this.noOpenedWindows.slice();

    for (let i = 0; i < this.openedTabFilter.length; i++) {
      if (!this.openedTabFilter[i].title.toUpperCase().includes(filterText)) {
        this.openedTabFilter.splice(i, 1);
        i--;
      }
    }

    for (let i = 0; i < this.windowsFilter.length; i++) {
      if (!this.windowsFilter[i].title.toUpperCase().includes(filterText)) {
        this.windowsFilter.splice(i, 1);
        i--;
      }
    }

    setTimeout(() => {
      this.filtering = false;
    }, 300);
  }

  /**
   * METODO PARA MAXIMIZAR UNA VENTANA HECHA PESTAÑA
   * @param event ID DE LA PESTAÑA-VENTANA
   */
  public changeWindow(event: string) {
    let index = this.openedTabData.findIndex(tab => tab.id == event);
    if (index !== -1) {
      if (!this.openedTabData[index].maximized) {
        this._tabWindowService.changeTabWindow(event);
      }
    }
    else {
      index = this.noOpenedWindows.findIndex(window => window.id == event);
      if (!this.noOpenedWindows[index].maximized) {
        this._tabWindowService.changeTabWindow(event);
      }
    }
  }

  /**
   * METODO PARA CERRAR UNA VENTANA Y UN TAB
   * @param event ID DE LA PESTAÑA-VENTANA
   */
  public closeWinTab(event: string) {
    this._tabWindowService.closeWindow(event);
  }

  ngOnDestroy() {
    this.subscriptor.unsubscribe();
    this.subscrip.unsubscribe();
    this.openNewWinSubscrip.unsubscribe();
    this.showMenuSubscrip.unsubscribe();
  }
}
