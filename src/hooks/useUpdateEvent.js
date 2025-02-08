import { useState } from 'react';

const useUpdateEvent = () => {
    const [updating, setUpdating] = useState(false);
    const [updateError, setUpdateError] = useState(null);

    const updateEvent = async (eventData, eventImageFile) => {
        setUpdating(true);
        setUpdateError(null);

        const token = localStorage.getItem('authToken');

        if (!token) {
            setUpdateError('User is not authenticated.');
            setUpdating(false);
            return false;
        }

        try {
            const formData = new FormData();

            // 🔹 Добавляем все текстовые данные
            Object.keys(eventData).forEach((key) => {
                if (typeof eventData[key] === 'object' && eventData[key] !== null && key !== 'eventImage') {
                    formData.append(key, JSON.stringify(eventData[key])); // Конвертируем объекты в JSON
                } else {
                    formData.append(key, eventData[key]);
                }
            });

            // ✅ Добавляем файл, если он есть
            if (eventImageFile) {
                console.log("📸 Adding event image to FormData:", eventImageFile.name);
                formData.append('eventImage', eventImageFile);
            }

            console.log('📤 FormData перед отправкой:');
            for (let pair of formData.entries()) {
                console.log(pair[0], pair[1]); // Проверяем, что передаём и текст, и файл
            }

            const response = await fetch(
                `${process.env.REACT_APP_HAMBAX_NEW_API_URL}/api/events/${eventData._id}`,
                {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`, // ❌ НЕ указываем `Content-Type`!
                    },
                    body: formData, // ✅ Используем `FormData`
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error updating event');
            }

            return await response.json();
        } catch (err) {
            setUpdateError(err.message || 'Something went wrong.');
            return false;
        } finally {
            setUpdating(false);
        }
    };

    return { updateEvent, updating, updateError };
};

export default useUpdateEvent;
