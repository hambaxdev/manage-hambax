import React from 'react';
import UserProfileForm from '../components/UserProfileForm';
import useUserProfile from '../hooks/useUserProfile';

const Profile = () => {
    const { profileData, isLoading, error, updateUserProfile } = useUserProfile();

    const handleSave = async (updatedProfile) => {
        const isUpdated = await updateUserProfile(updatedProfile);
        if (isUpdated) {
            alert('Profile updated successfully!');
        } else {
            alert('Failed to update profile!');
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return <UserProfileForm profileData={profileData} onSave={handleSave} />;
};

export default Profile;
