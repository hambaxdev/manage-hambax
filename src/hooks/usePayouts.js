import { useState, useEffect } from 'react';
import axios from '../services/axiosInstance';

const usePayouts = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');
    const [payouts, setPayouts] = useState([]);
    const [summary, setSummary] = useState(null);

    const fetchPayouts = async () => {
        setIsLoading(true);
        setApiError('');

        const token = localStorage.getItem('authToken');
        if (!token) {
            setApiError('User is not authenticated');
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.get(
                `${process.env.REACT_APP_HAMBAX_NEW_API_URL}/api/payment/payouts`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                console.log(response.data);
                setPayouts(response.data.payouts || []);
                setSummary(response.data.summary || null);
            }
        } catch (error) {
            setApiError(error.response?.data?.error || 'Ошибка при загрузке выплат');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPayouts();
    }, []);

    return {
        isLoading,
        apiError,
        payouts,
        summary,
        refetchPayouts: fetchPayouts,
    };
};

export default usePayouts;
