import { Component, OnInit, OnDestroy } from '@angular/core';
import { DynaContent } from '../../interfaces/dyna-content.interface';
import { CONTENT_TYPES } from '../../config/content-type';
import { Subscription } from 'rxjs';
//import { DynaContentService } from 'src/app/services/dyna-content.service';
import { ASSETS } from 'src/app/config/assets-url';

@Component({
  selector: 'horizon-modal',
  templateUrl: './horizon-modal.component.html',
  styleUrls: ['./horizon-modal.component.scss']
})
export class HorizonModalComponent implements OnInit, OnDestroy {
  private subscriber: Subscription;

  public _ref: any;
  public _dynaContent: DynaContent;
  public contentTypes: any;

  public backgroundClass: string;
  public showClass: string;
  public preloader: string;
  public fullDisplay: boolean;
  public fullLoader: boolean;
  public modalReady: boolean;

  constructor(
    //private _dynaContentService: DynaContentService
  ) {
    this.modalReady = false;
    this.preloader = ASSETS.preloader;
    this.contentTypes = CONTENT_TYPES;

    /*this.subscriber = this._dynaContentService.removeDynaCont$.subscribe((closeIt: boolean) => {
      if (closeIt) {
        this.close(closeIt);
      }
    });*/
  }

  ngOnInit() {
    this.defineFullHeight();
    this.defineFullHeightLoader();
    setTimeout(() => {
      this.modalReady = true;
    }, 700);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.backgroundClass = "on";
      this.showClass = "show";
    }, 50);
  }

  /**
   * METODO PARA DEFINIR LAS VISTAS QUE OCUPAN TODA LA PANTALLA:
   */
  private defineFullHeight() {
    if (this._dynaContent.contentType == this.contentTypes.new_media || this._dynaContent.contentType == this.contentTypes.new_pub || this._dynaContent.contentType == this.contentTypes.edit_queja || this._dynaContent.contentType == this.contentTypes.view_queja || this._dynaContent.contentType == this.contentTypes.edit_profile || this._dynaContent.contentType == this.contentTypes.view_transmission || this._dynaContent.contentType == this.contentTypes.planilla_detail || this._dynaContent.contentType == this.contentTypes.paypal || this._dynaContent.contentType == this.contentTypes.register_profile || (this._dynaContent.contentType == this.contentTypes.view_comments && !this._dynaContent.contentData.halfModal)) {
      this.fullDisplay = true;
    }
    else {
      this.fullDisplay = false;
    }
  }

  /**
   * METODO PARA DEFINIR LAS VISTAS QUE OCUPAN TODA LA PANTALLA:
   */
  private defineFullHeightLoader() {
    if (this._dynaContent.contentType == this.contentTypes.new_claim || this._dynaContent.contentType == this.contentTypes.view_img || this._dynaContent.contentType == this.contentTypes.new_media || this._dynaContent.contentType == this.contentTypes.new_pub || this._dynaContent.contentType == this.contentTypes.edit_queja || this._dynaContent.contentType == this.contentTypes.view_queja || this._dynaContent.contentType == this.contentTypes.edit_profile || this._dynaContent.contentType == this.contentTypes.view_transmission || this._dynaContent.contentType == this.contentTypes.planilla_detail || this._dynaContent.contentType == this.contentTypes.paypal || this._dynaContent.contentType == this.contentTypes.register_profile || (this._dynaContent.contentType == this.contentTypes.view_comments && !this._dynaContent.contentData.halfModal)) {
      this.fullLoader = true;
    }
    else {
      this.fullLoader = false;
    }
  }

  /**
   * METODO PARA DAR EL EFECTO DE DESVANECIMIENTO DEL MODAL PARA LUEGO CERRARLO:
   */
  closeModal() {
    this.backgroundClass = "";
    this.showClass = "";

    setTimeout(() => {
      this.removeObject();
    }, 300);
  }

  /**
   * METODO PARA CERRAR EL MODAL DESDE UN BOTÓN HIJO:
   * @param closeEvent DATO QUE LLEGA DEL EVENT EMITTER
   */
  close(closeEvent: Boolean) {
    if (closeEvent) {
      this.closeModal();
    }
  }

  /**
   * METODO PARA CERRAR EL MODAL AL DAR CLICK FUERA DEL MISMO:
   * @param event 
   */
  onClickClose(event: any) {
    event.preventDefault();
    this.closeModal();
  }

  /**
   * METODO PARA ELIMINAR LA REFERENCIA DE ESTE COMPONENTE DINÁMICO DENTRO DE TODA LA APP
   */
  removeObject() {
    this._ref.destroy();
  }

  ngOnDestroy() {
    //this._dynaContentService.removeDynaContent(false);
    this.subscriber.unsubscribe();
  }
}