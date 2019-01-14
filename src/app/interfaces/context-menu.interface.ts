import { GenericMenuOption } from "./generic-menu-option.interface";

export interface ContextMenu {

    hasButton: boolean;
    options: GenericMenuOption[];
}