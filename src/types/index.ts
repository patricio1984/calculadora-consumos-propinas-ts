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

export type OrderData = {
    items: OrderItem[];
    tip: number;
    total: {
    subtotal: number;
    tip: number;
    total: number;
    };
};

export type OrderPDFData = {
    items: {
    id: number;
    name: string;
    quantity: number;
    price: string;
    total: string;
    }[];
    tip: string;
    total: {
    subtotal: string;
    tip: string;
    total: string;
    };
};
