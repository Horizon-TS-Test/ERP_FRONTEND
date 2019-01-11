import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { INPUT_TYPES } from 'src/app/config/input-types';
import { FormGroup } from '@angular/forms';
import { DynamicInputForm } from 'src/app/models/input/dynamic-input-form';
import { TextInput } from 'src/app/models/input/text-input';
import { DateInput } from 'src/app/models/input/date-input';
import { TextareaInput } from 'src/app/models/input/textarea-input';

@Component({
  selector: 'dyna-input',
  templateUrl: './dynamic-form-input.component.html',
  styleUrls: ['./dynamic-form-input.component.scss']
})
export class DynamicFormInputComponent implements OnInit, OnChanges {
  @Input() inputForm: DynamicInputForm<any>;
  @Input() parentForm: FormGroup;
  @Input() pushedInputValue: { key: string; value: string };
  @Input() showError: boolean;
  @Output() changedInput: EventEmitter<{ key: string; value: string }>;

  public inputTypes: any;

  constructor() {
    this.inputTypes = INPUT_TYPES;
    this.changedInput = new EventEmitter<{ key: string; value: string }>();
  }

  ngOnInit() {
    switch (this.inputForm.inputData.controlType) {
      case INPUT_TYPES.text:
        this.inputForm = <TextInput>this.inputForm;
        break;
      case INPUT_TYPES.date:
        this.inputForm = <DateInput>this.inputForm;
        break;
      case INPUT_TYPES.textArea:
        this.inputForm = <TextareaInput>this.inputForm;
        break;
    }
  }

  /**
   * METODO PARA DETECTAR EL CAMBIO DE VALOR EN UN INPUT Y ENVIARLO AL COMPONENTE PADRE
   * @param event 
   */
  public onInputChange() {
    if(this.inputForm.inputData.propagateChanges) {
      this.changedInput.emit({ key: this.inputForm.inputData.key, value: this.parentForm.controls[this.inputForm.inputData.key].value });
    }
  }

  /**
   * METODO PARA DEFINIR SI EL INPUT ES INVALIDO O NO:
   */
  get isInvalid() {
    let valid = this.parentForm.controls[this.inputForm.inputData.key].valid;
    let touched = (this.showError) ? this.showError : this.parentForm.controls[this.inputForm.inputData.key].touched;
    return touched && !valid;
  }

  /**
   * METODO PARA DETECTAR LOS CAMBIOS DE UNA PROPIEDAD INYECTADA DESDE EL COMPONENTE PADRE DE ESTE COMPONENTE:
   * @param changes LOS CAMBIOS GENERADOS
   */
  ngOnChanges(changes: SimpleChanges) {
    for (const property in changes) {
      if (property == 'pushedInputValue') {
        if (changes[property].currentValue) {
          this.pushedInputValue = changes[property].currentValue;
          if (this.pushedInputValue.key == this.inputForm.inputData.key) {
            this.parentForm.controls[this.inputForm.inputData.key].setValue(this.pushedInputValue.value);
          }
        }
      }
    }
  }
}
