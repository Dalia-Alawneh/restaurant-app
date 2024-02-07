import { ShoppingCart } from "lucide-react";
import { green } from "../../../assets";
import StyledTitle from "./ui/StyledTitle";
import { getData } from "../../../helpers/api";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { IProduct } from "../../../interfaces";
import { useAppDispatch } from "../../../app/store";
import { addToCart } from "../../../features/cart";

const ProductItem = ({ product }: { product: IProduct }) => (
  <div className="w-full md:w-1/2 relative">
    <svg
      className="shap-bg hidden xl:inline"
      viewBox="0 0 917 588"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M883.652 165.651L-28 0.330566V587.331L854.966 365.127C869.165 361.554 880.277 350.509 883.935 336.332L915.245 215.004C921.053 192.498 906.522 169.798 883.652 165.651Z"
        fill="var(--primary)"
      ></path>
    </svg>
    <div>
      <img
        src={product?.attributes?.img.data.attributes.url}
        alt=""
        className="rotate-img bg-white rounded-full custom-shadow xl:absolute top-8 right-24"
      />
    </div>
  </div>
);

const ProductDescription = ({ product }: { product: IProduct }) => {
  const dispatch = useAppDispatch()

  return <div className="w-full md:w-1/2 info">
    <StyledTitle
      subTitle=""
      align="start"
      title={
        <h2 className="capitalize text-[30px] xl:text-[50px] font-[700] text-[#18214F] mb-4 text-center">
          {product?.attributes?.title.slice(0, 15)}
        </h2>
      }
    />
    <p className="xl:w-2/3">
      It is a long established fact that a reader will be distracted by the
      readable content of a page when looking at its layout.
    </p>
    <div onClick={() => dispatch(addToCart(product))}
      className="mt-8 bg-[--primary] rounded p-3 cursor-pointer w-[120px] flex justify-center items-center">
      <ShoppingCart color="white" />
    </div>
  </div>
}
const MainProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const getProducts = async () => {
    try {
      const data = await getData(
        "/products?populate=categories&populate=img&pagination[pageSize]=4&pagination[page]=1"
      );
      if (data.data.length) {
        setProducts(data.data);
      }
    } catch (e) {
      toast.error("Something goes wrong.!🥲");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  const dispatch = useAppDispatch()

  return (
    <div className="my-10 relative overflow-hidden py-8">
      <img src={green} alt="" className="absolute right-0 hidden xl:inline" />
      <div className="flex flex-col sm:flex-row items-center gap-8 mx-8 sm:mx-16 xl:mx-0 border-b pb-10 xl:border-0">
        <ProductItem product={products[0]} />
        <ProductDescription product={products[0]} />
      </div>
      <div className="flex flex-col sm:flex-row items-center my-8 gap-8 mx-8 sm:mx-16 xl:mx-0 border-b pb-10 xl:border-0">
        <div className="w-full md:w-1/2 info p-0 xl:ps-24">
          <StyledTitle subTitle="" align="start"
            title={<h2 className="capitalize text-[30px] xl:text-[50px] font-[700] text-[#18214F] mb-4 text-center">
              {products[3]?.attributes?.title.slice(0, 15)}</h2>} />
          <p>
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
          </p>
          <div onClick={() => dispatch(addToCart(products[3]))}
            className="mt-8 bg-[--primary] rounded p-3 cursor-pointer  
          w-[120px] flex justify-center items-center">
            <ShoppingCart color="white" />
          </div>
        </div>
        <div className="w-full md:w-1/2 relative">
          <svg className="shap-2 hidden xl:inline" viewBox="0 0 903 588" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M33.3484 165.82L945 0.5V587.5L62.0341 365.297C47.8353 361.723 36.7234 350.678 33.0648 336.501L1.75452 215.174C-4.05347 192.668 10.4783 169.968 33.3484 165.82Z" fill="var(--primary)"></path>
          </svg>
          <div>
            <img src={products[3]?.attributes?.img.data?.attributes.url} alt="" className="rotate-img bg-white w-fit p-1 md:p-3 rounded-full custom-shadow xl:absolute top-8 left-24" />
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-8 mx-8 sm:mx-16 xl:mx-0 border-b pb-10 xl:border-0">
        <ProductItem product={products[2]} />
        <ProductDescription product={products[2]} />
      </div>
    </div>
  );
};

export default MainProducts;
