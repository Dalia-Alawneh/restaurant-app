import { useQuery } from '@tanstack/react-query'
import axiosInstance from '../config/axios';
import { AxiosRequestConfig } from 'axios';
interface IAuthenticatedQuery{
    queryKey : string[];
    url: string;
    config:AxiosRequestConfig;
}
const useGetAuthenticatedQuery = ({queryKey, config,url}:IAuthenticatedQuery) => {
    return useQuery({
        queryKey,
        queryFn: async () => {
            const response = await axiosInstance.get(url,config)
            return response.data
        }
    })
}

export default useGetAuthenticatedQuery