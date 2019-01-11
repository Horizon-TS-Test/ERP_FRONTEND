import { DynamicInputForm } from "./dynamic-input-form";
import { INPUT_TYPES } from "src/app/config/input-types";
import { GenericInput } from "src/app/interfaces/input/generic-input.interface";
import { TextBoxInput } from "src/app/interfaces/input/textbox-input.interface";

export class TextInput extends DynamicInputForm<string>{

    constructor(
        public inputData: GenericInput<string>,
        public textInputData: TextBoxInput
    ) {
        super(inputData);
        this.textInputData.readonly = !!this.textInputData.readonly;
        this.textInputData.pattern = this.textInputData.pattern || '';
        this.textInputData.type = this.textInputData.type || 'text';
        this.inputData.controlType = INPUT_TYPES.text;
    }
}