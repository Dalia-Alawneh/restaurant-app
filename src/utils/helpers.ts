import { IProduct } from "../interfaces"
import axiosInstance from "../config/axios"

export const getData =async (url:string) :Promise<IProduct[]> => {
    const {data} =await axiosInstance.get(url)
    return data.data
}