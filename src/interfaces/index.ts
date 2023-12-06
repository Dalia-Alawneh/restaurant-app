export interface ITempOrder {
    id: number;
    title: string;
    price: number;
    qty: number;
}
export interface IOrder {
    id: number;
    products:IProduct[];
    date:string;
}
export interface IProduct {
    id: number;
    img: string;
    attributes: {
        img: {
            data:{
                attributes:{
                    url:string
                }
            }
        };
        title: string;
        price: number;
        stars: number;
        duration: string;
    };
    qty?:number;
}

export interface ICategory {
    id: number;
    attributes:{
        title: string;
        img: {
            data:{
                attributes:{
                    url:string
                }
            }
        };
    };
}

export interface ICustomer{
    name:string;
    phone:string;
    address?:string;
}