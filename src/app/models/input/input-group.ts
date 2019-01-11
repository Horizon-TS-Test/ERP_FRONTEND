import { DynamicInputForm } from "./dynamic-input-form";

export class InputGroup {
    constructor(
        public icon: string,
        public inputFormList: DynamicInputForm<any>[]
    ) { }
}