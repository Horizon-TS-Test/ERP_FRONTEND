interface DetailRow {
    icon: string;
    label: string;
    value: string;
    customIcon?: boolean;
}
export interface Detail {
    title: string;
    deletePanel?: boolean;
    rows: DetailRow[];
}