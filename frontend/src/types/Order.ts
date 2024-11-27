import type {Category} from "@/types/Category";
import type {User} from "@/types/User";

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
    user: User
}