import { useState } from "react";

const useValidateTicket = () => {
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const validateTicket = async (qrHash) => {
        setLoading(true);
        setStatus(null);

        const token = localStorage.getItem('authToken');
        if (!token) {
            setStatus('User is not authenticated.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_HAMBAX_NEW_API_URL}/tickets/${qrHash}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (response.ok) {
                setStatus("success");
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Error validating ticket:", error);
            setStatus("error");
        } finally {
            setLoading(false);
        }
    };

    return { validateTicket, status, loading };
};

export default useValidateTicket;
