import React, { useState } from "react";
import UserProfileForm from "../components/UserProfileForm";
import useUserProfile from "../hooks/useUserProfile";
import { useTranslation } from "react-i18next";
import NotificationBanner from "../components/NotificationBanner";

const Profile = () => {
    const { t } = useTranslation();
    const { profileData, isLoading, error, updateUserProfile } = useUserProfile();

    const [notification, setNotification] = useState({ open: false, message: "", type: "info" });

    console.log("Profile Data:", profileData); // Проверка загружаются ли данные

    const handleSave = async (updatedProfile) => {
        const isUpdated = await updateUserProfile(updatedProfile);
        if (isUpdated) {
            setNotification({ open: true, message: t("profile.updateSuccess"), type: "success" });
        } else {
            setNotification({ open: true, message: t("profile.updateFailure"), type: "error" });
        }
    };

    if (isLoading) {
        return (
            <>
                <p>{t("profile.loading")}</p>
                <NotificationBanner open={true} message={t("profile.loading")} type="info" />
            </>
        );
    }

    if (error) {
        return (
            <>
                <p>{t("profile.error", { error })}</p>
                <NotificationBanner open={true} message={t("profile.error", { error })} type="error" />
            </>
        );
    }

    return (
        <>
            <UserProfileForm profileData={profileData || {}} onSave={handleSave} />

            <NotificationBanner 
                open={notification.open} 
                message={notification.message} 
                type={notification.type} 
                onClose={() => setNotification({ ...notification, open: false })} 
            />
        </>
    );
};

export default Profile;
