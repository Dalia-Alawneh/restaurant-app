export interface IOrder{
    id:number;
    title:string;
    price:number;
    qty:number;
}

export interface IProduct {
    id: number;
    attributes:{
        title: string;
        price: number;
        stars: number;
        duration:string;
    }
    img: string;
}