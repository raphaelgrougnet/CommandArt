import type {Order} from "@/types/Order";

export interface Category {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    orders: Order[];
}