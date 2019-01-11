export interface GenericInput<T> {
    value?: T;
    key?: string;
    label?: string;
    required?: boolean;
    erroMsg?: string;
    placeholder?: string;
    dimensionClass?: string;
    order?: number;
    controlType?: number;
    propagateChanges?: boolean;
}