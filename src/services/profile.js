// src/services/profile.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getProfile = async () => {
    const response = await axios.get(`${API_URL}/profile`);
    return response.data;
};

export const updateProfile = async (profileData) => {
    const response = await axios.put(`${API_URL}/user/update-profile`, profileData);
    return response.data;
};
