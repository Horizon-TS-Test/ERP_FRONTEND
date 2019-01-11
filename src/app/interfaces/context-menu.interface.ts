interface ContextOption {
    icon: string;
    text: string;
    action: number;
    customIcon?: boolean;
}
export interface ContextMenu {
    hasButton: boolean;
    options: ContextOption[];
}