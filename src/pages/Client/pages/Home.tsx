import Categories from "../components/Categories"
import FoodQuality from "../components/FoodQuality"
import Header from "../components/Header"
import Features from "../components/Features"
import MainProducts from "../components/MainProducts"
import Products from "../components/Products"

const Home = () => {
  return (
    <div className="home">
      <Header />
      <Features/>
      <FoodQuality/>
      <Categories/>
      <MainProducts/>
      <Products/>
    </div>
  )
}

export default Home