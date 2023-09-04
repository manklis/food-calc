import { useEffect } from "react"
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import FoodForm from "../components/FoodForm"
import Spinner from '../components/Spinner'
import { getAllFood, reset } from "../features/food/foodSlice"
import FoodItem from "../components/FoodItem"

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const {foodItems, isLoading, isError, message} = useSelector((state) => state.foods)

  useEffect(() => {
    if(isError){
      console.log(message)
    }
    //console.log(user)
    if (!user) {
      navigate('/login')
    }
    dispatch(getAllFood())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])
  
  if (isLoading){
    return <Spinner />
  }
  return (
    <>
    <section className="heading">
      <h1>Welcome {user && user.name[0].toUpperCase() + user.name.slice(1)}!</h1>
      <p>Food Calculator</p>
    </section>
    <FoodForm /> 

    <section className="content">
      {foodItems.length > 0 ? (
        <div className="foodItems">
        {foodItems.map((foodItem) => (
          <FoodItem key={foodItem._id} food={foodItem} />))}
          </div>
      ) : (<h3> You do not have any food items to calculate </h3>) }
    </section>
    </>
  )
}

export default Dashboard