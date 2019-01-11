import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { HorizonButton } from 'src/app/interfaces/horizon-button.interface';
import { PROCESS_TYPES } from 'src/app/config/process-type';
import { BTN_APPEARANCE } from 'src/app/config/button-appearance';

const INIT_ANIMATION = 'appear';
const ANIMATION_INTERVAL = 100;
const DISABLED_CLASS = 'custom-btn-disabled';
const FOCUSED_CLASS = 'custom-btn-inverted p-cursor-default';

@Component({
  selector: 'action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss']
})
export class ActionButtonsComponent implements OnInit, OnChanges {
  @Input() buttonList: HorizonButton[];
  @Output() clickedButton: EventEmitter<HorizonButton>;

  public btnAppearance: any;
  public pTypes: any;
  public auxButtonList: HorizonButton[];

  constructor() {
    this.clickedButton = new EventEmitter<HorizonButton>();
    this.pTypes = PROCESS_TYPES;
    this.btnAppearance = BTN_APPEARANCE;
  }

  ngOnInit() {
    this.auxButtonList = this.buttonList;
  }

  /**
   * METODO PARA APLICAR ANIMACIÓN DE CAMBIO A LA LISTA DE BOTONES:
   */
  private animateBtnList(animateIn: boolean = true) {
    let time = ANIMATION_INTERVAL;
    if (animateIn) {
      for (let i = 0; i < this.auxButtonList.length; i++) {
        setTimeout(() => {
          this.auxButtonList[i].class = INIT_ANIMATION;
        }, time);
        time += ANIMATION_INTERVAL;
      }
    }
    else {
      for (let i = this.auxButtonList.length - 1; i >= 0; i--) {
        setTimeout(() => {
          this.auxButtonList[i].class = '';
        }, time);
        time += ANIMATION_INTERVAL;
      }
    }
  }

  /**
   * METODO PARA PROPAGAR LA ACCION DEL BOTON AL DAR CLICK EN EL
   * @param event 
   * @param btnId 
   */
  public onBtnClick(event: any, index: number) {
    event.preventDefault();

    if (this.buttonList[index].focusOnClick) {
      if (this.buttonList[index].class.indexOf(FOCUSED_CLASS) == -1) {
        this.buttonList[index].class += ' ' + FOCUSED_CLASS;
      }
      else {
        return
      }

      for (let i = 0; i < this.buttonList.length; i++) {
        if (i !== index) {
          if (this.buttonList[i].class.indexOf(DISABLED_CLASS) == -1) {
            this.buttonList[i].class += ' ' + DISABLED_CLASS;
            this.buttonList[i].disabledClick = true;
          }
        }
      }
    }

    if (!this.buttonList[index].disabledClick) {
      this.clickedButton.emit(this.buttonList[index]);
    }

  }

  ngOnChanges(changes: SimpleChanges) {
    for (const property in changes) {
      if (property === 'buttonList') {
        if (changes[property].currentValue) {
          let updatedBtnList = <HorizonButton[]>changes[property].currentValue;
          let previous = changes[property].previousValue;
          let timer = 0;
          if (previous != undefined && this.auxButtonList) {
            this.animateBtnList(false);
            timer = this.auxButtonList.length * ANIMATION_INTERVAL + ANIMATION_INTERVAL * 5;
          }
          if (updatedBtnList.length > 0) {
            setTimeout(() => {
              this.auxButtonList = updatedBtnList;
              this.animateBtnList();
            }, timer);
          }
        }
      }
    }
  }
}
