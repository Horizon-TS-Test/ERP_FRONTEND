import { GenericInput } from "src/app/interfaces/input/generic-input.interface";

export class DynamicInputForm<T> {
    constructor(
        public inputData: GenericInput<T>
    ) {
        this.inputData.key = this.inputData.key || '';
        this.inputData.label = this.inputData.label || '';
        this.inputData.placeholder = this.inputData.placeholder || '';
        this.inputData.dimensionClass = this.inputData.dimensionClass || 'col-12';
        this.inputData.required = !!this.inputData.required;
        this.inputData.order = this.inputData.order === undefined ? 1 : this.inputData.order;
        this.inputData.erroMsg = this.inputData.erroMsg || '';
    }
}