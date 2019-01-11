import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TitleButton } from 'src/app/interfaces/title-btn.interface';
import { BTN_APPEARANCE } from 'src/app/config/button-appearance';

@Component({
  selector: 'h-title-btn-list',
  templateUrl: './horizon-title-btn-list.component.html',
  styleUrls: ['./horizon-title-btn-list.component.scss']
})
export class HorizonTitleBtnListComponent implements OnInit {
  @Input() titleBtnList: TitleButton[];
  @Output() clickedBtnAction: EventEmitter<number>;

  public btnAppearance: any;

  constructor() {
    this.btnAppearance = BTN_APPEARANCE;
    this.clickedBtnAction = new EventEmitter<number>();
  }

  ngOnInit() {
  }

  /**
   * METODO PARA PROPAGAR EL CLICK DE UN BOTON HACIA SU PADRE
   * @param event 
   */
  public handleClick(event: any, btnAction: number) {
    event.preventDefault();
    this.clickedBtnAction.emit(btnAction);
  }

  /**
   * METODO PARA PREVENIR EL CLICK DERECHO EN LOS ENLACES:
   * HREF: https://medium.com/@sheepczx/how-to-create-a-context-menu-in-angular-2-9c9b502687f1
   * @param event
   */
  public onRightClick(event: any) {
    event.preventDefault();
  }

}
