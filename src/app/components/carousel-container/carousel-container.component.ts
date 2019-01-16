import { Component, OnInit, OnDestroy, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { PopoverMenuService } from 'src/app/services/popover-menu.service';
import { Subscription } from 'rxjs';
import { CONTENT_TYPES } from 'src/app/config/content-type';
import { DynaContent } from 'src/app/interfaces/dyna-content.interface';
import { ContentService } from 'src/app/services/content.service';
import { MarcaComponent } from '../marca/marca.component';
import { SUBMENU_ACTIONS } from 'src/app/config/submenu-actions';
import { MainPanelOption } from 'src/app/interfaces/main-pan-option';
import { SucursalComponent } from '../sucursal/sucursal.component';

const NEXT_CLASS = 'next';
const PREV_CLASS = 'prev';
const VISIBILITY_CLASS = 'p-visibility-hidden';

@Component({
  selector: 'carousel-container',
  templateUrl: './carousel-container.component.html',
  styleUrls: ['./carousel-container.component.scss']
})
export class CarouselContainerComponent implements OnInit, OnDestroy, OnChanges {
  @Input() dynaContent: DynaContent;
  @Input() showSecondContent: boolean;
  @ViewChild("dynaSubComponent", { read: ViewContainerRef }) dynaSubContentRef: ViewContainerRef;
  @Output() secondContent: EventEmitter<boolean>;

  private subscriptor: Subscription;
  private currentWindowId: string;
  private currentSubMenuAction: number;
  private dynaComponentRef: any;

  public contentTypes: any;
  public mainContentClass: string;
  public currentContent: boolean;

  public mainContent: number;
  public secondaryContOptions: number[];
  public visibilityClass: string;

  constructor(
    private _popoverMenuService: PopoverMenuService,
    private _contentService: ContentService,
    private _componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.contentTypes = CONTENT_TYPES;
    this.currentContent = true;
    this.secondContent = new EventEmitter<boolean>();
    this.visibilityClass = VISIBILITY_CLASS;
  }

  ngOnInit() {
    this.getDyna();
    this.listenTopSubmenuClick();
  }

  /**
   * METODO PARA OBTENER LOS VALORES DE LOS CONTENIDOS A MOSTRAR DENTRO DEL CARRUSEL
   */
  private getDyna() {
    this.mainContent = this.dynaContent.contentType;

    let mainPanOption: MainPanelOption
    mainPanOption = <MainPanelOption>this.dynaContent.contentData.mainPanOption;
    this.currentWindowId = mainPanOption.id;
  }

  /**
   * METODO PARA DEFINIR EL CONTENIDO SECUNDARIO A MOSTRAR:
   * @param actionType 
   */
  private iniCarouselAnimation(isMainContent: boolean) {
    this.mainContentClass = PREV_CLASS;

    setTimeout(() => {
      this.visibilityClass = '';
      this.currentContent = isMainContent;
      this.mainContentClass = NEXT_CLASS;

      setTimeout(() => {
        this.mainContentClass = '';
      }, 500);

    }, 300);

  }

  /**
   * METODO PARA ESCUCHAR CUANDO UNA OPCION DEL SUBMENU DEL POP-OVER-MENU HA SIDO CLICKEADA:
   */
  private listenTopSubmenuClick() {
    this.subscriptor = this._popoverMenuService.onClickSubmenuOp$.subscribe((submenu: { windowId: string, submenuAction: number }) => {
      if (submenu) {
        if (submenu.windowId == this.currentWindowId) {
          if (this.currentSubMenuAction !== submenu.submenuAction) {
            this.currentSubMenuAction = submenu.submenuAction;
            this.defineDynaSubContent();
          }
        }
      }
    });
  }

  /**
   * METODO PARA DEFINIR EL CONTENIDO DINAMICO A MOSTRAR EN LA SEGUNDA SECCION DEL CARRUSEL
   */
  private defineDynaSubContent() {
    let component: any;
    switch (this.currentSubMenuAction) {
      case SUBMENU_ACTIONS.marcas:
        component = MarcaComponent;
        break;
      case SUBMENU_ACTIONS.sucursales:
        component = SucursalComponent;
        break;
    }

    if (component) {
      this.dynaComponentRef = this._contentService.addComponent(component, this._componentFactoryResolver, this.dynaSubContentRef, { contentType: this.currentSubMenuAction, contentData: null });
      this.iniCarouselAnimation(false);
      this.secondContent.emit(true);
    }
  }

  /**
   * METODO PARA QUITAR EL COMPONENTE CARGADO DINAMICAMENTE, APLICANDO ANIMACION
   */
  private removeSynaSubContent() {
    this.currentSubMenuAction = null;
    this.iniCarouselAnimation(true);
    setTimeout(() => {
      this.dynaComponentRef.destroy();
      this.visibilityClass = VISIBILITY_CLASS;
    }, 300)
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let property in changes) {
      if (property == 'showSecondContent') {
        if (changes[property].currentValue == false) {
          this.removeSynaSubContent();
        }
      }
    }
  }

  ngOnDestroy() {
    this.subscriptor.unsubscribe();
    this._popoverMenuService.onClickModalSubmenuOption(null);
  }
}
