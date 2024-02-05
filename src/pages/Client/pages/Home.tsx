import Categories from "../components/Categories"
import FoodQuality from "../components/FoodQuality"
import Header from "../components/Header"
import Features from "../components/features"

const Home = () => {
  return (
    <div className="home">
      <Header />
      <Features/>
      <FoodQuality/>
      <Categories/>
    </div>
  )
}

export default Home