import type {Category} from "@/types/Category";

export interface Order {
    id: string;
    name: string;
    description: string;
    cost: number;
    category: Category;
    limitDate: string;
    maxRadius: number;
    createdAt: string;
    updatedAt: string;
}