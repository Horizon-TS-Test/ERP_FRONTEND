import { TextInput } from "./text-input";
import { INPUT_TYPES } from "src/app/config/input-types";
import { GenericInput } from "src/app/interfaces/input/generic-input.interface";
import { DateIn } from "src/app/interfaces/input/date-input.interface";
import { DynamicInputForm } from "./dynamic-input-form";

export class DateInput extends DynamicInputForm<string> {
    constructor(
        public inputData: GenericInput<string>,
        public dateInputData: DateIn,
    ) {
        super(inputData);
        inputData.controlType = INPUT_TYPES.date;
    }
}