import { Injectable } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { InputGroup } from '../models/input/input-group';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {

  constructor() { }

  /**
   * METODO PARA CREAR UN NUEVO FORM GROUP A PARTIR DE UN ARRAY DE TIPO INPUT-GROUP
   * @param inputGroup 
   */
  public createFormGroup(inputGroup: InputGroup[]) {
    let group: any = {};

    for (let input of inputGroup) {
      input.inputFormList.forEach(inputForm => {
        group[inputForm.inputData.key] = inputForm.inputData.required ?
          new FormControl(inputForm.inputData.value || '', Validators.required) :
          new FormControl(inputForm.inputData.value || '');
      });
    }
    return new FormGroup(group);
  }
}
