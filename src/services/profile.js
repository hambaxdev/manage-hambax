// src/services/profile.js
import axios from '../services/axiosInstance';
import config from '../config';

const API_URL = config.apiUrl;

export const getProfile = async () => {
    const response = await axios.get(`${API_URL}/profile`);
    return response.data;
};

export const updateProfile = async (profileData) => {
    const response = await axios.put(`${API_URL}/user/update-profile`, profileData);
    return response.data;
};
