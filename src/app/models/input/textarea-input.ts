import { DynamicInputForm } from "./dynamic-input-form";
import { INPUT_TYPES } from "src/app/config/input-types";
import { Textarea } from "src/app/interfaces/input/textarea-input.interface";
import { GenericInput } from "src/app/interfaces/input/generic-input.interface";

export class TextareaInput extends DynamicInputForm<string>{
    constructor(
        public inputData: GenericInput<string>,
        public textareaData: Textarea,
    ) {
        super(inputData);
        this.inputData.controlType = INPUT_TYPES.textArea;
        this.textareaData.cols = this.textareaData.cols || '30';
        this.textareaData.rows = this.textareaData.rows || '3';
        this.textareaData.pattern = this.textareaData.pattern || '';
    }
}