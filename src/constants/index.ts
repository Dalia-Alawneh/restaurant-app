import { feature1, feature2, feature3 } from "../assets";
import { IFormFeild } from "../interfaces";

export const navLinks: { text: string; path: string }[] = [
    {
        text: "pos",
        path: "/",
    },
    {
        text: "transaction",
        path: "/transaction",
    },
    {
        text: "dashboard",
        path: "/dashboard",
    },
]
export const posSideBarLinks: { text: string; path: string; icon?: string }[] = [
    {
        text: "people",
        path: "people",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users-round"><path d="M18 21a8 8 0 0 0-16 0"/><circle cx="10" cy="8" r="5"/><path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"/></svg>',
    },
    {
        text: "orders",
        path: "orders",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users-round"><path d="M18 21a8 8 0 0 0-16 0"/><circle cx="10" cy="8" r="5"/><path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"/></svg>',

    },
    {
        text: "wallet",
        path: "wallet",
        icon: 'UsersRound'
    },
    {
        text: "food items",
        path: "foodItems",
    },
]

export const productFormFeilds: IFormFeild[] = [
    {
        type: 'text',
        placeholder: 'title',
        name: "title",
    },
    {
        type: 'number',
        placeholder: 'price',
        name: "price",
    },
    {
        type: 'number',
        placeholder: 'discount',
        name: "discount",
    },
    {
        type: 'text',
        placeholder: 'duration',
        name: "duration",
    },
]

export const registerFormFeilds: IFormFeild[] = [
    {
        name: 'email',
        type: 'email',
        placeholder: 'Email',
    },
    {
        name: 'username',
        type: 'text',
        placeholder: 'Username',
    },
    {
        name: 'password',
        type: 'password',
        placeholder: 'Password',
    },
    {
        name: 'confirmPassword',
        type: 'password',
        placeholder: 'confirm Password',
    },
]
export const loginFormFeilds: IFormFeild[] = [
    {
        name: 'identifier',
        type: 'text',
        placeholder: 'Identifier',
    },
    {
        name: 'password',
        type: 'password',
        placeholder: 'Password',
    },
]

export const clientNavLinks: { text: string; path: string }[] = [
    {
        text: "home",
        path: "/home",
    },
    {
        text: "about",
        path: "/",
    },
    {
        text: "shop",
        path: "/",
    },
    {
        text: "blog",
        path: "/",
    },
    {
        text: "contact",
        path: "/",
    },
]
export const features: { title: string; image: string; description: string; }[] = [
    {
        image: feature1,
        title:"Easy To Order",
        description: "It is a long established fact that a reader of a page when looking at its layout."
    },
    {
        image: feature2,
        title:"Fastest Deilvery",
        description: "It is a long established fact that a reader of a page when looking at its layout."
    },
    {
        image: feature3,
        title:"Best Quailty",
        description: "It is a long established fact that a reader of a page when looking at its layout."
    },
]