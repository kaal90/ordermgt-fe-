import axios from 'axios';

const API = process.env.REACT_APP_API_URL + "/product";

//GET ALL
export const getProducts = async () =>{
    const response = await axios.get(API);
    return response.data;
}