import { useState } from 'react';
import axios from '../services/axiosInstance';

const useValidateTicket = () => {
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const validateTicket = async (qrHash) => {
        setLoading(true);
        setStatus(null);

        const token = localStorage.getItem('authToken');
        if (!token) {
            setStatus('unauthenticated');
            setLoading(false);
            return;
        }

        try {
            await axios.post(
                `${process.env.REACT_APP_HAMBAX_NEW_API_URL}/api/tickets/validate/${qrHash}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setStatus('success');
        } catch (error) {
            console.error('Error validating ticket:', error);
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return { validateTicket, status, loading };
};

export default useValidateTicket;
