import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormService } from 'src/app/services/dynamic-form.service';
import { FormView } from 'src/app/models/form-view';
import { ALERT_TYPES } from 'src/app/config/alert-types';

declare var $: any;

@Component({
  selector: 'form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.scss']
})
export class FormViewComponent implements OnInit, OnChanges {
  @Input() formView: FormView;
  @Input() startAnimation: boolean;
  @Input() letReset: boolean;
  @Input() letSubmit: boolean;
  @Input() letMsg: boolean;
  @Input() pushedInputValue: { key: string; value: string };
  @Output() changedInput: EventEmitter<{ key: string; value: string }>;
  @Output() submitedData: EventEmitter<JSON>;

  private payLoad;
  private showMessage;
  public actionTypes: any;
  public form: FormGroup;
  public showInputError: boolean;

  constructor(
    private _dynamicFormService: DynamicFormService
  ) {
    this.changedInput = new EventEmitter<{ key: string; value: string }>();
    this.submitedData = new EventEmitter<JSON>();
    this.actionTypes = ALERT_TYPES;
  }

  ngOnInit() {
    this.createForm();
  }

  /**
   * METODO PARA CREAR UN NUEVO FORMULARIO CON LOS DATOS PRE DEFINIDOS
   */
  private createForm() {
    this.form = this._dynamicFormService.createFormGroup(this.formView.inputGroup);
  }

  /**
   * METODO PARA DETECTAR EL CAMBIO DE ALGUN INPUT DEL FORM VIEW Y ENVIARLO AL COMPONENTE PADRE
   * @param event VALOR DEL EVENT EMITTER
   */
  public getChangedInput(event: { key: string; value: string }) {
    this.changedInput.emit(event);
  }

  /**
   * METODO PARA EXTRAER LOS DATOS DEL FORMULARIO EN EL EVENTO DE SUBMIT
   */
  public onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
    this.payLoad = JSON.parse(this.payLoad);
    this.submitedData.emit(this.payLoad);
  }

  private manageAlert(showMessage: boolean) {
    if (showMessage == true) {
      if (this.formView.alertType) {
        if (this.formView.alertType == ALERT_TYPES.danger || this.formView.alertType == ALERT_TYPES.warning) {
          this.showInputError = true;
        }
        else {
          this.showInputError = false;
        }
        if (!this.showMessage) {
          $(".detail-message").slideToggle("fast");
          this.showMessage = true;
        }
      }
    }
    else {
      if (!this.formView.alertType) {
        if (this.showMessage) {
          $(".detail-message").slideToggle("fast");
          this.showMessage = false;
          this.showInputError = false;
        }
      }
    }
  }

  /**
   * METODO PARA DETECTAR LOS CAMBIOS DE UNA PROPIEDAD INYECTADA DESDE EL COMPONENTE PADRE DE ESTE COMPONENTE:
   * @param changes LOS CAMBIOS GENERADOS
   */
  ngOnChanges(changes: SimpleChanges) {
    for (const property in changes) {
      switch (property) {
        case 'letSubmit':
          if (changes[property].currentValue == true) {
            this.onSubmit();
          }
          break;
        case 'letReset':
          if (changes[property].currentValue == true) {
            this.createForm();
            this.showInputError = false;
          }
          break;
        case 'letMsg':
          this.manageAlert(changes[property].currentValue);
          break;
      }
    }
  }
}
