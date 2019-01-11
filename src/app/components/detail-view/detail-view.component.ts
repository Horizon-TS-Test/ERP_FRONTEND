import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Detail } from 'src/app/interfaces/detail-view.interface';
import { ACTION_TYPES } from '../../config/action-types';

@Component({
  selector: 'detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss']
})
export class DetailViewComponent implements OnInit {
  @Input() detailData: Detail;
  @Input() startAnimation: boolean;
  @Output() detailBtnAction: EventEmitter<number>;

  public actionTypes: any;

  constructor() {
    this.detailBtnAction = new EventEmitter<number>();
    this.actionTypes = ACTION_TYPES;
  }

  ngOnInit() {
  }

  /**
   * METODO PARA DAR AVISO DE LA ELIMINACION DEL REGISTRO AL COMPONENTE PADRE DE ESTE COMPONENTE
   * @param event 
   */
  public onBtnClick(event, action: number) {
    event.preventDefault();
    this.detailBtnAction.emit(action);
  }

}
