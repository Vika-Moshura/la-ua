import { ICategoryResponse } from "../category/category.interface";

export interface IProductRequest {
    category: ICategoryResponse;
    name: string;
    path: string;
    description: string;
    weight: string;
    price: number;
    imagePath: string;
    proteins: number;
    carbohydrates: number;
    fats: number;
    calories: number;
    count:number;
}

export interface IProductResponse extends IProductRequest {
    id: number;
}