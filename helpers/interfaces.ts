export interface User {
    _id?: string;
    name: string;
}

export interface Expense {
    _id?: string;
    category: string;
    userId: string;
    amount: number;
    currency: "dollar" | string;
    date?: Date;
    dateStr?: string;
    description: string;
}