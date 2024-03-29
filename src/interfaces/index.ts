export interface ITempOrder {
    id: number;
    products: IProduct[];
    date: string;
}
export interface IOrder {
    id: number;
    attributes: {
        date: string;
        name: string;
        phone: string;
        status: "delivering" | "completed";
        totalPrice: number;
        address: string;
        products: {
            data: IProduct[]
        };
    };
    products: {
        data: IProduct[]
    };
}
export interface IProduct {
    id: number;
    img: string;
    attributes: {
        img: {
            data: {
                attributes: {
                    url: string
                }
            }
        };
        categories?: {
            data: {
                attributes: {
                    title: string;
                };
            }[];
        };
        title: string;
        price: number;
        stars: number;
        duration: string;
        discount?: number;
        isNew?: boolean;
        sales: number;
        stock: number
    };
    qty?: number;
}

export interface ICategory {
    id: number;
    attributes: {
        title: string;
        products: {
            data: IProduct[];
        };
        img: {
            data: {
                attributes: {
                    url: string;
                }
            }
        };
    };
}

export interface ICustomer {
    name: string;
    phone: string;
    address?: string;
}


export interface ISelectOptions {
    title: string;
    id: number;
}

export interface IFormFeild {
    name: string;
    placeholder: string;
    type: string;
}
export interface IUser {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    isAdmin: boolean;
    name: string;
    city: string;
    phone: number | string;
}
