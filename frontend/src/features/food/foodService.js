import axios from "axios";

const API_URL = "/calc/";

//Create new food item
const createFood = async (foodData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, foodData, config);

  return response.data;
};

// Get all user food items
const getAllFood = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  //console.log(response.data);
  return response.data;
};

// Delete food item
const deleteFood = async (foodId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + foodId, config);

  return response.data;
};

const foodService = {
  createFood,
  getAllFood,
  deleteFood,
};

export default foodService;
