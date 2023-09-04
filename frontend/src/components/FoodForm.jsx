import { useState } from "react"
import { useDispatch } from "react-redux"
import {createFood} from '../features/food/foodSlice'

const FoodForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        calories: 0,
        price: 0,
    })

    const {name, calories, price} = formData

    const dispatch = useDispatch()

    const onChange = (e) => {
        setFormData((prevState) => ({...prevState, [e.target.name]: e.target.value}))
      }
    const onSubmit = e => {
        e.preventDefault()
        dispatch(createFood(formData))
        setFormData({
            name: "",
            calories: 0,
            price: 0,
        })
    }
  return (
    <section className="form">
        <form onSubmit={onSubmit}>
        <div className="form-group">
            <label htmlFor="name">Food</label>
            <input type="text" name="name" id='name' value={name} onChange={onChange} />
        </div>
        <div className="form-group">
            <label htmlFor="calories">Calories</label>
            <input type="number" min='0' name="calories" id='calories' value={calories} onChange={onChange} />
        </div>
        <div className="form-group">
            <label htmlFor="price">Price</label>
            <input type="number" min='0' step='0.01' name="price" id='price' value={price} onChange={onChange} />
        </div>
        <div className="form-group">
            <button className="btn btn-block" type='submit'>Add food</button>
        </div>
        </form>
    </section>
  )
}

export default FoodForm