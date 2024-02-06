import Categories from "../components/Categories"
import FoodQuality from "../components/FoodQuality"
import Header from "../components/Header"
import Features from "../components/Features"
import MainProducts from "../components/MainProducts"

const Home = () => {
  return (
    <div className="home">
      <Header />
      <Features/>
      <FoodQuality/>
      <Categories/>
      <MainProducts/>
    </div>
  )
}

export default Home