import axios from 'axios';

const API_URL = 'http://localhost:5001'; 

export const getAllBookingsByUserId = async (userId, token) => {
  try {
    const response = await axios.get(`${API_URL}/booking/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};
