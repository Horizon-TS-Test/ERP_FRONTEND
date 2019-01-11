import { Component, OnInit } from '@angular/core';
import { PROCESS_TYPES } from 'src/app/config/process-type';
import { HorizonButton } from 'src/app/interfaces/horizon-button.interface';
import { BTN_APPEARANCE } from 'src/app/config/button-appearance';
import { Table } from 'src/app/interfaces/table.interface';
import { Detail } from 'src/app/interfaces/detail-view.interface';
import { FormView } from 'src/app/models/form-view';
import { InputGroup } from 'src/app/models/input/input-group';
import { TextInput } from 'src/app/models/input/text-input';
import { DateInput } from 'src/app/models/input/date-input';
import { TextareaInput } from 'src/app/models/input/textarea-input';
import { ACTION_TYPES } from 'src/app/config/action-types';
import { DateManager } from 'src/app/tools/date-manager';
import { ALERT_TYPES } from 'src/app/config/alert-types';

const CEDULA = 'fcnCedula';
const NOMBRE = 'fcnNombre';
const FEC_NAC = 'fcnFecNac';
const EDAD = 'fcnEdad';
const CELULAR = 'fcnCelular';
const TELEFONO = 'fcnTelefono';
const DIRECCION = 'fcnDireccion';

@Component({
  selector: 'empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {
  public pTypes: any;
  public processType: number;
  public startAnimation: boolean;
  public actionBtnList: HorizonButton[];
  public tableData: Table;
  public detailData: Detail;
  public createFormView: FormView;
  public letSubmit: boolean;
  public letReset: boolean;
  public letMsg: boolean;
  public pushedInputValue: { key: string; value: string };

  constructor() {
    this.pTypes = PROCESS_TYPES;
    this.processType = this.pTypes.retrieve;
    this.startAnimation = true;
  }

  ngOnInit() {
    this.defineTableData();
    this.defineActionBtnList();
    this.defineDetailData();
  }

  /**
   * METODO PARA DEFINIR LA LIST DE BOTONES PARA LAS ACCIONES PRINCIPALES
   */
  private defineActionBtnList() {
    this.actionBtnList = [
      {
        action: null,
        icon: 'plus',
        processType: this.pTypes.create,
        appearance: BTN_APPEARANCE.normal
      },
      {
        action: null,
        icon: 'pencil',
        processType: this.pTypes.update,
        appearance: BTN_APPEARANCE.info
      },
      {
        action: null,
        icon: 'trash',
        processType: this.pTypes.delete,
        focusOnClick: true,
        appearance: BTN_APPEARANCE.danger
      }
    ];
  }

  /**
   * METODO PARA DEFINIR UNA ANIMACION
   */
  private setAnimation(procType: number) {
    this.startAnimation = false;
    setTimeout(() => {
      this.processType = null;

      setTimeout(() => {
        this.processType = procType;

        setTimeout(() => {
          this.startAnimation = true;
        }, 100);
      }, 600);

    }, 200);
  }

  /**
   * METODO PARA DEFINIR DINAMICAMENTE LOS BOTONES DE ACUERDO AL PROCESO ACTUAL QUE VAYA A SER EJECUTADO
   * @param procType TIPO DE PROCESO
   */
  private defineDinamicInterface(procType: number) {
    switch (procType) {
      case this.pTypes.create:
        this.defineFormData();
        this.defineCreateUpdateBtnList();
        break;
      case this.pTypes.update:
        this.defineEditFormData();
        this.defineCreateUpdateBtnList();
        break;
      case this.pTypes.delete:
        this.detailData.deletePanel = true;
        break;
      case this.pTypes.cancel:
        this.defineActionBtnList();
        this.pushedInputValue = null;
        break;
    }
  }

  /**
   * METODO PARA HABILITAR LA SECCION DE NUEVO REGISTRO:
   * @param clickedBtn
   */
  private changeProcessType(procType: number) {
    if (this.processType != procType) {
      this.defineDinamicInterface(procType);
      if (procType != this.pTypes.delete) {
        this.setAnimation(procType);
      }
    }
  }

  /**
   * METODO PARA ESTABLECER UN TIPO DE MENSAJE A MOSTRAR EN EL FORM VIEW
   */
  private setFormViewMsg(aType: number, aMsg: string, showMsg: boolean) {
    this.createFormView.alertType = aType;
    this.createFormView.alertMsg = aMsg;
    this.letMsg = showMsg;
  }

  /**
   * METODO PARA CAPTURAR LA ACCION DE UN ACTION-BUTTON CLICKEADO
   */
  public getBtnAction(clickedBtn: HorizonButton) {
    if (clickedBtn.processType != null) {
      this.changeProcessType(clickedBtn.processType);
    }
    else {
      switch (clickedBtn.action) {
        case ACTION_TYPES.submit:
          setTimeout(() => {
            this.letSubmit = null;
          });
          this.letSubmit = true;
          break;
        case ACTION_TYPES.reset:
          this.setFormViewMsg(null, null, false);
          setTimeout(() => {
            this.letReset = null;
          });
          this.letReset = true;
          break;
      }
    }
  }

  /****************************************************************************************************************************************************************************
  *****************************************************************************************************************************************************************************
  * METODOS ASOCIADOS AL PROCESO CREATE Y UPDATE:
  *****************************************************************************************************************************************************************************
  ****************************************************************************************************************************************************************************/

  /**
   * METODO PARA DEFINIR LOS DATOS DEL FORM VIEW CONFORME EL FORMATO PREDEFINIDO
   */
  private defineFormData() {
    if (!this.createFormView) {
      this.createFormView = new FormView('Nuevo Cliente', [
        new InputGroup('address-card',
          [
            new TextInput({ key: CEDULA, required: true, erroMsg: 'Se requiere un número de identificación. <strong>Ej: 0614251789</strong>', order: 1, placeholder: 'Cédula' }, { pattern: '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]' })
          ]
        ),
        new InputGroup('user',
          [
            new TextInput({ key: NOMBRE, required: true, erroMsg: 'Se requiere un nombre y apellido. <strong>Ej: Albert Einstein</strong>', order: 2, placeholder: 'Nombre' }, { pattern: '[a-zA-Z áéíóúäëïü]+' })
          ]
        ),
        new InputGroup('calendar',
          [
            new DateInput({ key: FEC_NAC, required: true, erroMsg: 'Se requiere una fecha de nacimiento', order: 3, placeholder: 'Fecha Nacimiento', propagateChanges: true, dimensionClass: 'col-8' }, { max: '2000-12-31', min: '1940-01-01' }),
            new TextInput({ key: EDAD, order: 4, placeholder: 'Edad', dimensionClass: 'col-4' }, { readonly: true })
          ]
        ),
        new InputGroup('phone',
          [
            new TextInput({ key: CELULAR, required: true, order: 5, erroMsg: 'Se requiere un número de contacto. <strong>Ej: 0982563214</strong>', placeholder: 'Celular', dimensionClass: 'col-6' }, { type: 'tel', pattern: '[0-9]+' }),
            new TextInput({ key: TELEFONO, order: 6, placeholder: 'Teléfono', dimensionClass: 'col-6' }, { type: 'tel', pattern: '[0-9]+' })
          ]
        ),
        new InputGroup('location-arrow',
          [
            new TextareaInput({ key: DIRECCION, order: 7, placeholder: 'Dirección' }, {}),
          ]
        ),
      ]);
    }
    else {
      this.setFormViewMsg(null, null, false);
      for (let inputGroup of this.createFormView.inputGroup) {
        for (let input of inputGroup.inputFormList) {
          input.inputData.value = '';
        }
      }
    }
  }

  /**
   * METODO PARA DEFINIR LOS DATOS DEL FORM VIEW CONFORME EL FORMATO PREDEFINIDO
   */
  private defineEditFormData() {
    if (!this.createFormView) {
      this.createFormView = new FormView('Actualizar Cliente', [
        new InputGroup('address-card',
          [
            new TextInput({ key: CEDULA, value: '0603344417', required: true, erroMsg: 'Se requiere un número de identificación. <strong>Ej: 0614251789</strong>', order: 1, placeholder: 'Cédula' }, { pattern: '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]' })
          ]
        ),
        new InputGroup('user',
          [
            new TextInput({ key: NOMBRE, value: 'Waldon Fredi Román Salas', required: true, erroMsg: 'Se requiere un nombre y apellido. <strong>Ej: Albert Einstein</strong>', order: 2, placeholder: 'Nombre' }, { pattern: '[a-zA-Z áéíóúäëïü]+' })
          ]
        ),
        new InputGroup('calendar',
          [
            new DateInput({ key: FEC_NAC, value: '1992-03-09', required: true, erroMsg: 'Se requiere una fecha de nacimiento', order: 3, placeholder: 'Fecha Nacimiento', propagateChanges: true, dimensionClass: 'col-8' }, { max: '2000-12-31', min: '1940-01-01' }),
            new TextInput({ key: EDAD, value: '26', order: 4, placeholder: 'Edad', dimensionClass: 'col-4' }, { readonly: true })
          ]
        ),
        new InputGroup('phone',
          [
            new TextInput({ key: CELULAR, value: '0984076783', required: true, order: 5, erroMsg: 'Se requiere un número de contacto. <strong>Ej: 0982563214</strong>', placeholder: 'Celular', dimensionClass: 'col-6' }, { type: 'tel', pattern: '[0-9]+' }),
            new TextInput({ key: TELEFONO, value: '032926432', order: 6, placeholder: 'Teléfono', dimensionClass: 'col-6' }, { type: 'tel', pattern: '[0-9]+' })
          ]
        ),
        new InputGroup('location-arrow',
          [
            new TextareaInput({ key: DIRECCION, value: 'Cdla. 1° Constituyente Mz. 11 casa N° 03', order: 7, placeholder: 'Dirección' }, {}),
          ]
        ),
      ]);
    }
    else {
      this.createFormView.title = 'Actualizar Cliente';
      this.setFormViewMsg(null, null, false);
      for (let inputGroup of this.createFormView.inputGroup) {
        for (let input of inputGroup.inputFormList) {
          switch (input.inputData.key) {
            case CEDULA:
              input.inputData.value = '0603344417';
              break;
            case NOMBRE:
              input.inputData.value = 'Waldon Fredi Román Salas';
              break;
            case FEC_NAC:
              input.inputData.value = '1992-03-09';
              break;
            case EDAD:
              input.inputData.value = '26';
              break;
            case CELULAR:
              input.inputData.value = '0984076783';
              break;
            case TELEFONO:
              input.inputData.value = '032926432';
              break;
            case DIRECCION:
              input.inputData.value = 'Cdla. 1° Constituyente Mz. 11 casa N° 03';
              break;
          }
        }
      }
    }
  }

  /**
   * METODO PARA DEFINIR LA LISTA DE BOTONES PARA EL PROCESO CREATE:
   */
  private defineCreateUpdateBtnList() {
    this.actionBtnList = [
      {
        action: ACTION_TYPES.submit,
        icon: 'check',
        appearance: BTN_APPEARANCE.normal
      },
      {
        action: ACTION_TYPES.reset,
        icon: 'eraser',
      },
      {
        action: null,
        icon: 'ban',
        processType: this.pTypes.cancel
      }
    ];
  }

  /**
   * METODO PARA DETECTAR EL CAMBIO DE ALGUN INPUT DEL FORM VIEW, PARA MANIPULAR EL VALOR ACTUALIZADO
   * @param event VALOR DEL EVENT EMITTER
   */
  public getChangedInput(event: { key: string; value: string }) {
    if (event.key == FEC_NAC) {
      let age = DateManager.calcAge(event.value) + '';
      this.pushedInputValue = { key: EDAD, value: age };
    }
  }

  /**
   * METODO PARA OBTENER LOS DATOS DE LOS CAMPOS DEL FORM VIEW
   * @param jsonFormData 
   */
  public getSumitedData(jsonFormData: JSON) {
    console.log("jsonFormData", jsonFormData);
    this.createFormView.alertType = ALERT_TYPES.warning;
    this.createFormView.alertMsg = 'Existen campos requeridos que deben ser llenados';

    setTimeout(() => {
      this.letMsg = null;
    });
    this.letMsg = true;
  }

  /****************************************************************************************************************************************************************************
  *****************************************************************************************************************************************************************************
  * METODOS ASOCIADOS AL PROCESO RETRIEVE:
  *****************************************************************************************************************************************************************************
  ****************************************************************************************************************************************************************************/

  /**
     * METODO PARA DEFINIR LOS DATOS DE UN DETAIL VIEW EN EL FORMATO PREDEFINIDO
     */
  private defineDetailData() {
    this.detailData = {
      title: 'Detalle de Cliente',
      rows: [
        {
          icon: 'address-card',
          label: 'Cédula',
          value: '0603344417'
        },
        {
          icon: 'user',
          label: 'Cliente',
          value: 'Fredi Román Salas'
        },
        {
          icon: 'phone',
          label: 'Teléfono',
          value: '032926432'
        },
        {
          icon: 'mobile',
          label: 'Celular',
          value: '098076783'
        },
        {
          icon: 'location-arrow',
          label: 'Dirección',
          value: 'Cdla. 1° Constituyente Mz. 11 Casa N° 03'
        },
      ]
    };
  }

  /**
   * METODO PARA CAPTURAR LA ACCION DE UN ACTION-BUTTON CLICKEADO
   */
  public getDetailViewBtnAction(action: number) {
    switch (action) {
      case ACTION_TYPES.delete:
        alert("TODO LISTO PARA ELIMINAR!! :D");
        break;
      case ACTION_TYPES.cancel:
        this.defineActionBtnList();
        this.detailData.deletePanel = false;
        break;
    }
  }

  /****************************************************************************************************************************************************************************
  *****************************************************************************************************************************************************************************
  * METODOS ASOCIADOS AL PROCESO LIST:
  *****************************************************************************************************************************************************************************
  ****************************************************************************************************************************************************************************/

  /**
   * METODO PARA DEFINIR LOS DATOS DE UNA TABLA EN EL FORMATO PREDEFINIDO
   */
  private defineTableData() {
    this.tableData = {
      title: 'Lista de Clientes',
      columnlabels: ['N°', 'Cédula', 'Cliente', 'Teléfono', 'Celular'],
      rows: [
        {
          id: '0',
          columns: [{ colspan: null, value: '1' }, { colspan: null, value: '0603344417' }, { colspan: null, value: 'Fredi Román Salas' }, { colspan: null, value: '032926432' }, { colspan: null, value: '0984076783' }],
          isSelectedRow: true
        },
        {
          id: '1',
          columns: [{ colspan: null, value: '2' }, { colspan: null, value: '0325212457' }, { colspan: null, value: 'Jacob Thornton' }, { colspan: null, value: '032865421' }, { colspan: null, value: '0985603214' }],
          isSelectedRow: false
        },
        {
          id: '2',
          columns: [{ colspan: null, value: '3' }, { colspan: null, value: '1801233657' }, { colspan: null, value: 'Larry Thomson' }, { colspan: null, value: '032456352' }, { colspan: null, value: '0975632012' }],
          isSelectedRow: false
        },
        {
          id: '3',
          columns: [{ colspan: null, value: '4' }, { colspan: null, value: '1025696301' }, { colspan: '2', value: 'Jacob Oliver' }, { colspan: null, value: '0365214589' }],
          isSelectedRow: false
        },
        {
          id: '4',
          columns: [{ colspan: null, value: '5' }, { colspan: null, value: '1032547890' }, { colspan: null, value: 'Alonso Romo' }, { colspan: null, value: '022168597' }, { colspan: null, value: '0937856201' }],
          isSelectedRow: false
        },
      ]
    };
  }

  /**
   * METODO PARA RECIBIR EL OBJETO QUE VIENE DE LA LISTA AL HABER DADO CLICK EN UNA FILA
   * @param selectedObj ID DEL OBJETO SELECCIONADO DE LA TABLA QUE DEVUELVE EL EVENT EMITTER
   */
  public getClickedRowId(selectedRowId: string) {
    this.changeProcessType(this.pTypes.retrieve);
  }
}
