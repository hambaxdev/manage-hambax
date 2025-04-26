import { useState, useEffect } from 'react';
import axios from '../services/axiosInstance';

const useTicketSales = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [salesData, setSalesData] = useState([]);

  const fetchTicketSales = async () => {
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
        `${process.env.REACT_APP_HAMBAX_NEW_API_URL}/api/tickets/sales`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Sales data:', response.data);
      setSalesData(response.data || []);
    } catch (error) {
      setApiError(error.response?.data?.error || 'Ошибка при загрузке статистики билетов');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTicketSales();
  }, []);

  return {
    isLoading,
    apiError,
    salesData,
    refetchTicketSales: fetchTicketSales,
  };
};

export default useTicketSales;
