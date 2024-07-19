import './Home.css'
import Header from '../../Components/Header/Header'
import { ExploreMenu } from '../../Components/ExploreMenu/ExploreMenu'
import { useEffect, useState } from 'react'
import FoodDisplay from '../../Components/FoodDisplay/FoodDisplay'
import { food_list } from '../../assets/assets'
import AppDownload from '../../Components/AppDownload/AppDownload'
const Home = () => {
  const [Category, setCategory] = useState('All')
  
  return (
    <div>
        <Header/>
        <ExploreMenu Category={Category} setCategory={setCategory} />
        <FoodDisplay Category={Category} />
        <AppDownload/>
    </div>
  )
}

export default Home