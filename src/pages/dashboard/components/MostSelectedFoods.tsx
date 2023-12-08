import toast from "react-hot-toast"
import { IProduct } from "../../../interfaces"
import { getData } from "../../../utils/helpers"
import DashProductCard from "./DashProductCard"
import ItemWrapper from "./ItemWrapper"
import {useState, useEffect} from 'react'

const MostSelectedFoods = () => {
    const [mostSelectedFoods, setMostSelectedFoods] = useState<IProduct[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const setData = async () => {
        try {
            const data = await getData('/products?populate=categories&populate=img&pagination[pageSize]=4&pagination[page]=1')
            if (data.data.length) {
                setMostSelectedFoods(data.data)
                setIsLoading(false)
            }
        } catch (e) {
            toast.error('Something goes wrong.!🥲')
        }
    }
    useEffect(() => {
        setData()
    }, [])
    return (
        <div className="my-8">
                    <h2>Most Selected Foods</h2>
                    <ItemWrapper>
                        <div className="grid mt-8 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full justify-start gap-6">
                            {mostSelectedFoods.map(product => (
                                <DashProductCard isLoading={isLoading}
                                    key={product.id}
                                    attributes={product.attributes}
                                    id={product.id}
                                    img={`http://localhost:1337${product.attributes.img.data.attributes.url}`}
                                />
                            ))}
                        </div>
                    </ItemWrapper>
                </div>
    )
}

export default MostSelectedFoods