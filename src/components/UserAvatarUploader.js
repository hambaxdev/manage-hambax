import React, { useState } from 'react';
import { Box, Button, Avatar } from '@mui/material';

const UserAvatarUploader = ({ currentAvatarUrl, onUpload }) => {
    const [avatarPreview, setAvatarPreview] = useState(currentAvatarUrl);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setAvatarPreview(reader.result);
            };
            reader.readAsDataURL(file);
            onUpload(file);
        }
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Avatar src={avatarPreview} sx={{ width: 100, height: 100 }} />
            <Button variant="contained" component="label">
                Upload New Picture
                <input type="file" hidden onChange={handleFileChange} />
            </Button>
        </Box>
    );
};

export default UserAvatarUploader;
