import { useDispatch } from "react-redux"
import {deleteFood} from "../features/food/foodSlice"
const FoodItem = ({food}) => {
    const dispatch = useDispatch()
  return (
    <div className="food">
        <div>
            {new Date(food.createdAt).toLocaleString('en-US')}
        </div>
        <h2>{food.name}</h2>
        <h2>Calories: {food.calories === null ? "NA" : food.calories}</h2>
        <h2>${food.price === null ? "NA" : food.price}</h2>
        <button onClick={() => dispatch(deleteFood(food._id))} className="close">X</button>
    </div>
  )
}

export default FoodItem