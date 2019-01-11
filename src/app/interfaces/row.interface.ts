interface Column {
    colspan: string;
    value: string;
}

export interface Row {
    id: string;
    columns: Column[];
    isSelectedRow: boolean
}