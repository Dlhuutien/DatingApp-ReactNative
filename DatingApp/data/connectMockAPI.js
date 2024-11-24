import axios from 'axios';

const API_URL = "https://6742e26fb7464b1c2a62f2eb.mockapi.io/User";

export const fetchUserData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};