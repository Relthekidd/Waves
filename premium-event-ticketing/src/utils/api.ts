import axios from 'axios';

const API_BASE_URL = '/api';

export const fetchInventory = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/inventory`);
    return response.data;
  } catch (error) {
    console.error('Error fetching inventory:', error);
    throw error;
  }
};

export const submitCheckout = async (checkoutData: Record<string, any>) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/checkout`, checkoutData);
    return response.data;
  } catch (error) {
    console.error('Error during checkout:', error);
    throw error;
  }
};

export const submitRSVP = async (rsvpData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/rsvp`, rsvpData);
    return response.data;
  } catch (error) {
    console.error('Error submitting RSVP:', error);
    throw error;
  }
};