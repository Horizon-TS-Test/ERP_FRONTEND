import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { HorizonButton } from '../../interfaces/horizon-button.interface';
import { BTN_APPEARANCE } from 'src/app/config/button-appearance';

@Component({
  selector: 'material-button',
  templateUrl: './material-button.component.html',
  styleUrls: ['./material-button.component.scss']
})
export class MaterialButtonComponent implements OnInit, OnChanges {
  @Input() buttonMeta: HorizonButton;
  @Output() buttonAction: EventEmitter<number>;

  public btnAppearance: any;

  constructor() {
    this.buttonAction = new EventEmitter<number>();
    this.btnAppearance = BTN_APPEARANCE;
  }

  ngOnInit() {
  }

  requestAction(event: any) {
    event.preventDefault();
    this.buttonAction.emit(this.buttonMeta.action);
  }

  /**
   * METODO PARA PREVENIR EL CLICK DERECHO EN LOS ENLACES:
   * @param event
   */
  public onRightClick(event: any) {
    event.preventDefault();
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const property in changes) {
      if (property === 'buttonMeta') {
        /*console.log('Previous:', changes[property].previousValue);
        console.log('Current:', changes[property].currentValue);
        console.log('firstChange:', changes[property].firstChange);*/

        if (changes[property].currentValue) {
          this.buttonMeta = <HorizonButton>changes[property].currentValue;
        }
      }
    }
  }
}
