import React from 'react';
import UserProfileForm from '../components/UserProfileForm';
import useUserProfile from '../hooks/useUserProfile';
import { useTranslation } from 'react-i18next';

const Profile = () => {
    const { t } = useTranslation(); // Hook for localization
    const { profileData, isLoading, error, updateUserProfile } = useUserProfile();

    const handleSave = async (updatedProfile) => {
        const isUpdated = await updateUserProfile(updatedProfile);
        if (isUpdated) {
            alert(t('profile.updateSuccess')); // Success message
        } else {
            alert(t('profile.updateFailure')); // Failure message
        }
    };

    if (isLoading) return <p>{t('profile.loading')}</p>; // Loading message
    if (error) return <p>{t('profile.error', { error })}</p>; // Error message with interpolation

    return <UserProfileForm profileData={profileData} onSave={handleSave} />;
};

export default Profile;
