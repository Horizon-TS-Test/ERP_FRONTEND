import { SUBMENU_ACTIONS } from "../config/submenu-actions";

export default [
    {
        windowId: 'op-pan-4',
        submenus: [
            {
                id: 'sub-menu-1',
                icon: 'list-alt',
                text: 'Catálogo Productos',
                action: SUBMENU_ACTIONS.catalogo_prod,
                customIcon: false,
            },
            {
                id: 'sub-menu-2',
                icon: 'list',
                text: 'Productos',
                action: SUBMENU_ACTIONS.productos,
                customIcon: false
            },
            {
                id: 'sub-menu-2',
                icon: 'snowflake-o',
                text: 'Marcas',
                action: SUBMENU_ACTIONS.marcas,
                customIcon: false
            },
        ]
    }
]