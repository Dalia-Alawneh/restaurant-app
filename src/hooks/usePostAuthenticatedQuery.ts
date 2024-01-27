import { useQuery } from '@tanstack/react-query'
import { AxiosRequestConfig } from 'axios';
import { postData } from '../helpers/api';
interface IAuthenticatedQuery {
    queryKey: string[];
    url: string;
    config: AxiosRequestConfig;
}
const usePostAuthenticatedQuery = ({ queryKey, url, body, config }: IAuthenticatedQuery) => {
    return useQuery({
        queryKey,
        queryFn: async () => {
            const response = await postData(url, body, config)
            return response.data
        }
    })
}

export default usePostAuthenticatedQuery