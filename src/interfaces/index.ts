export interface IOrder {
    id: number;
    title: string;
    price: number;
    qty: number;
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