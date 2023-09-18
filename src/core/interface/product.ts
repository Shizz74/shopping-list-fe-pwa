export interface Product {
    _id: string;
    name: string;
    unit: string;
    amount: number;
    amountToBuy: number;
    active: boolean;
    categoryId: {
        _id: string;
        name: string;
        color: string;
        date: Date;
    };
}
