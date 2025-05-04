// src/hooks/useStaffDashboardData.js
import { useState, useEffect } from 'react';
import axios from '../services/axiosInstance';

const useStaffDashboardData = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/tickets/dashboard/staff`);
                setCards(data.cards);
            } catch (error) {
                console.error("Failed to fetch dashboard cards:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { cards, loading };
};

export default useStaffDashboardData;
