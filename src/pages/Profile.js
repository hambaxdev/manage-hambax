import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Typography, Box, Snackbar, Alert } from "@mui/material";
import { useTranslation } from "react-i18next";
import UserProfileForm from "../components/UserProfileForm";
import UserAvatar from "../components/UserAvatar";
import useUserProfile from "../hooks/useUserProfile";
import CircularProgress from "@mui/material/CircularProgress";

// Suppress ResizeObserver warning globally (only in dev)
if (typeof window !== 'undefined') {
  window.addEventListener("error", (e) => {
    if (e.message === "ResizeObserver loop completed with undelivered notifications.") {
      e.stopImmediatePropagation();
    }
  });
}

const Profile = () => {
  const { t } = useTranslation();
  const { profileData, isLoading, error, updateUserProfile } = useUserProfile();
  const [avatar, setAvatar] = useState("/default-avatar.png");
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);

  useEffect(() => {

    if (profileData?.organization.avatar ) {
      setAvatar(profileData.organization.avatar);
    }
  }, [profileData]);

  const handleAvatarChange = useCallback((newAvatar) => {
    if (newAvatar.startsWith("blob:")) {
      console.warn("Ошибка: `blob://` не поддерживается в API");
      return;
    }

    setAvatar(newAvatar);
    updateUserProfile({ ...profileData, avatar: newAvatar });
  }, [profileData, updateUserProfile]);

  const handleSave = useCallback(async (updatedData) => {
    const success = await updateUserProfile(updatedData);
    if (success) {
      // Use setTimeout to avoid ResizeObserver glitch
      setTimeout(() => {
        setSuccessSnackbarOpen(true);
      }, 100);
    }
  }, [updateUserProfile]);

  const handleSnackbarClose = useCallback((_, reason) => {
    if (reason === "clickaway") return;
    setSuccessSnackbarOpen(false);
  }, []);

  // Memoize styles before conditional returns to follow React hooks rules
  const containerStyles = useMemo(() => ({
    maxWidth: 900,
    margin: "auto",
    mt: 5,
    px: { xs: 2, sm: 4 },
    pb: 3,
    bgcolor: "background.default",
    borderRadius: 2
  }), []);

  const avatarContainerStyles = useMemo(() => ({ 
    textAlign: "center", 
    mt: { xs: 6, sm: 8 } 
  }), []);

  const formContainerStyles = useMemo(() => ({ 
    mt: 3 
  }), []);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) return <p>{t("profile.error", { error })}</p>;
  if (!profileData) return <p>{t("profile.noData")}</p>;

  return (
    <Box sx={containerStyles}>
      <Box sx={avatarContainerStyles}>
        <UserAvatar avatarUrl={avatar} onAvatarChange={handleAvatarChange} />
        <Typography variant="h5">{profileData.fullName}</Typography>
        <Typography variant="body1" color="textSecondary">
          {profileData.role}
        </Typography>
      </Box>

      <Box sx={formContainerStyles}>
        <UserProfileForm profileData={profileData} onSave={handleSave} />
      </Box>

      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
          {t("profile.updateSuccess", "Изменения успешно сохранены!")}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;
