import axios from 'axios';

const API = process.env.REACT_APP_API_URL + "/order";

//GET ALL
export const getOrders = async (page = 1, limit = 10, search = "") => {
  const response = await axios.get(`${API}?page=${page}&limit=${limit}&search=${search}`);
  return response.data;
};

//GET BY ID
export const getOrderById = async (id) => {
  const response = await axios.get(`${API}/${id}`);
  return response.data;
};

//CREATE ORDER
export const createOrder = async (payload) => {
  const response = await axios.post(API, payload);
  return response.data;
};

//UPDATE BY ID
export const updateOrder = async (id, payload) => {
  const response = await axios.put(`${API}/${id}`, payload);
  return response.data;
};

//DELETE BY ID
export const deleteOrder = async (id) => {
  const response = await axios.delete(`${API}/${id}`);
  return response.data;
};