import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const registerUser = async (data) => {
    return await axios.post(`${API_URL}/registration/register`, data, {
        headers: { 'Content-Type': 'application/json' },
    });
};

export const completeUserRegistration = async (data, token) => {
    return await axios.post(`${API_URL}/user/complete-registration`, data, {
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
};
