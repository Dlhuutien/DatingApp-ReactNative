import axios from 'axios';

export const fetchUserData = async () => {
  try {
    const response = await axios.get("https://6742e26fb7464b1c2a62f2eb.mockapi.io/User");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const fetchMessages = async () => {
  try {
    const response = await axios.get("https://6742e26fb7464b1c2a62f2eb.mockapi.io/Message");
    return response.data;
  } catch (error) {
    console.error("Error fetching message data:", error);
    throw error;
  }
};