import { useState } from 'react';
import axios from '../services/axiosInstance';

const useUpdateEvent = () => {
    const [updating, setUpdating] = useState(false);
    const [updateError, setUpdateError] = useState(null);

    const updateEvent = async (eventData, eventImageFile) => {
        setUpdating(true);
        setUpdateError(null);

        const token = localStorage.getItem('authToken');

        if (!token) {
            setUpdateError('Пользователь не авторизован.');
            setUpdating(false);
            return false;
        }

        try {
            const formData = new FormData();

            // Добавляем все поля из eventData
            Object.keys(eventData).forEach((key) => {
                if (typeof eventData[key] === 'object' && eventData[key] !== null && key !== 'eventImage') {
                    formData.append(key, JSON.stringify(eventData[key]));
                } else {
                    formData.append(key, eventData[key]);
                }
            });

            // Добавляем файл, если он есть
            if (eventImageFile) {
                console.log("📸 Добавление изображения события:", eventImageFile.name);
                formData.append('eventImage', eventImageFile);
            }

            console.log('📤 Данные формы для отправки:');
            for (let pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }

            const response = await axios.put(
                `${process.env.REACT_APP_HAMBAX_NEW_API_URL}/api/events/${eventData._id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data;
        } catch (err) {
            setUpdateError(err.response?.data?.message || 'Ошибка при обновлении события');
            return false;
        } finally {
            setUpdating(false);
        }
    };

    return { updateEvent, updating, updateError };
};

export default useUpdateEvent;
