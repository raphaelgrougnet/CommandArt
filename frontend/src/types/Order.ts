export interface Order {
    id: string;
    name: string;
    description: string;
    cost: number;
    categoryId: string;
    limitDate: string;
    maxRadius: number;
    createdAt: string;
    updatedAt: string;
}