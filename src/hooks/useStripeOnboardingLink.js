import { useState } from "react";
import axios from "axios";

const useStripeOnboardingLink = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [stripeLink, setStripeLink] = useState(null);

    /**
     * Функция для обновления ссылки Stripe Onboarding
     */
    const fetchStripeOnboardingLink = async () => {
        setIsLoading(true);
        setError(null);
        setStripeLink(null);

        try {
            const accessToken = localStorage.getItem("authToken");

            const response = await axios.post(
                `${process.env.REACT_APP_HAMBAX_NEW_API_URL}/user/update-stripe-link`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (response.data.success) {
                setStripeLink(response.data.stripeLink);
                return response.data.stripeLink;
            } else {
                throw new Error(response.data.message || "Не удалось получить ссылку на онбординг Stripe");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Ошибка при получении ссылки на онбординг Stripe");
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    return { stripeLink, isLoading, error, fetchStripeOnboardingLink };
};

export default useStripeOnboardingLink;
