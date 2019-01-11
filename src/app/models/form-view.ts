import { InputGroup } from "./input/input-group";

export class FormView {

    constructor(
        public title: string,
        public inputGroup: InputGroup[],
        public alertType?: number,
        public alertMsg?: string
    ) { }
}