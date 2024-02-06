import { Link } from "react-router-dom";
import { ICategory } from "../../../../interfaces";

interface IProps {
  category: ICategory;
}
const CategoryCard = ({ category }: IProps) => {
  return (
    <Link to={`/home/category/${category.id}`} className="custom-shadow bg-white rounded-3xl flex flex-col gap-3 cursor-pointer items-center py-10 px-6">
      <img src={category.attributes.img.data.attributes.url} className="w-[90px] sm:w-1/3" alt="" />
      <h3 className="capitalize text-[#18214F] text-[20px] font-[600]">{category.attributes.title}</h3>
    </Link>
  )
}

export default CategoryCard