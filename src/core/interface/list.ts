import { Product } from "./product";

export interface List {
    _id: string;
    name: string;
    products: Product[];
}