import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const useResetToken = () => {
    const { t } = useTranslation();
    const [params] = useSearchParams();
    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const extractedToken = params.get('token');

        if (!extractedToken) {
            setError(t('errors.token_missing') || 'Reset token is missing.');
            setIsValid(false);
        } else {
            setToken(extractedToken);
            setError('');
            setIsValid(true);
        }
    }, [params, t]);

    return { token, error, isValid };
};

export default useResetToken;
