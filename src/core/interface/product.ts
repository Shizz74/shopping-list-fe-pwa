export interface Product {
    _id: string;
    name: string;
    unit: string;
    amount: number;
    amountToBuy: number;
    categoryId: {
        _id: string;
        name: string;
        color: string;
        date: Date;
    };
}
