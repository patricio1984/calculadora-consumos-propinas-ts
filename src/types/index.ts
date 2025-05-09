import type { ReactNode } from "react"

export interface MenuItemType {
    id: number;
    name: string;
    price: number;
    icon?: ReactNode;
}

export interface OrderItem extends MenuItemType {
    quantity: number;
}