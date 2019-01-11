export interface Tab {
    id: string;
    title: string;
    icon: string;
    customIcon: boolean;
    opened?: boolean;
    maximized?: boolean;
}