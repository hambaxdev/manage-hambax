import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import UserProfileForm from "../components/UserProfileForm";
import UserAvatar from "../components/UserAvatar";
import useUserProfile from "../hooks/useUserProfile";

const Profile = () => {
    const { t } = useTranslation();
    const { profileData, isLoading, error, updateUserProfile } = useUserProfile();
    const [avatar, setAvatar] = useState("/default-avatar.png");

    useEffect(() => {
        if (profileData?.avatar && !profileData.avatar.startsWith("blob:")) {
            setAvatar(profileData.avatar);
        }
    }, [profileData]);

    const handleAvatarChange = (newAvatar) => {
        if (newAvatar.startsWith("blob:")) {
            console.warn("Ошибка: `blob://` не поддерживается в API");
            return;
        }
    
        setAvatar(newAvatar);
        updateUserProfile({ ...profileData, avatar: newAvatar });
    };

    if (isLoading) return <p>{t("profile.loading")}</p>;
    if (error) return <p>{t("profile.error", { error })}</p>;
    if (!profileData) return <p>{t("profile.noData")}</p>;

    return (
        <Box sx={{ maxWidth: 900, margin: "auto", mt: 5, px: { xs: 2, sm: 4 }, pb: 3, bgcolor: "background.default", borderRadius: 2 }}>
            <Box sx={{ textAlign: "center", mt: { xs: 6, sm: 8 } }}>
                <UserAvatar avatarUrl={avatar} onAvatarChange={handleAvatarChange} />
                <Typography variant="h5">{profileData.fullName}</Typography>
                <Typography variant="body1" color="textSecondary">{profileData.role}</Typography>
            </Box>

            {/* User Profile Form */}
            <Box sx={{ mt: 3 }}>
                <UserProfileForm profileData={profileData} onSave={updateUserProfile} />
            </Box>
        </Box>
    );
};

export default Profile;
