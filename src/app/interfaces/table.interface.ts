import { Row } from "./row.interface";

export interface Table {
    title: string;
    columnlabels: any[],
    rows: Row[]
}