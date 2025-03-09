import React, { useState, useEffect, useCallback } from "react";
import { Avatar, IconButton, Box, Dialog, DialogActions, DialogContent, Slider, Button, Typography } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import Cropper from "react-easy-crop";
import getCroppedImg from "../utils/cropImage"; 

const UserAvatar = ({ avatarUrl, onAvatarChange, size = 120 }) => {
    const [avatar, setAvatar] = useState(avatarUrl || "/default-avatar.png");
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [openCropDialog, setOpenCropDialog] = useState(false);

    useEffect(() => {
        if (avatarUrl) {
            setAvatar(avatarUrl);
        }
    }, [avatarUrl]);

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result);
                setOpenCropDialog(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const onCropComplete = useCallback((_, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleSave = async () => {
        if (imageSrc && croppedAreaPixels) {
            const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels); // Base64
    
            setAvatar(croppedImage); // ✅ Устанавливаем Base64
            onAvatarChange(croppedImage); // ✅ Передаем Base64 в Profile.js
        }
        setOpenCropDialog(false);
    };

    return (
        <Box sx={{ position: "relative", display: "inline-block" }}>
            <input
                accept="image/*"
                type="file"
                style={{ display: "none" }}
                id="avatar-upload"
                onChange={handleAvatarChange}
            />
            <label htmlFor="avatar-upload">
                <Avatar 
                    src={avatar} 
                    sx={{ 
                        width: size, 
                        height: size, 
                        borderRadius: "50%" 
                    }}
                />
                <IconButton 
                    component="span"
                    sx={{ 
                        position: "absolute", 
                        bottom: 0, 
                        right: -10,  
                        backgroundColor: "white", 
                        borderRadius: "50%", 
                        width: 32, 
                        height: 32,
                        boxShadow: 1,  
                        "&:hover": {
                            backgroundColor: "grey.200"
                        }
                    }}
                >
                    <PhotoCameraIcon fontSize="small" />
                </IconButton>
            </label>

            {/* Диалоговое окно для кропинга */}
            <Dialog open={openCropDialog} onClose={() => setOpenCropDialog(false)} maxWidth="sm" fullWidth>
                <DialogContent sx={{ position: "relative", height: 300 }}>
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                    />
                </DialogContent>
                <DialogActions>
                    <Box sx={{ width: "100%", px: 2 }}>
                        <Typography variant="body2">Масштаб</Typography>
                        <Slider
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            onChange={(e, zoom) => setZoom(zoom)}
                        />
                    </Box>
                    <Button onClick={() => setOpenCropDialog(false)} color="secondary">Отмена</Button>
                    <Button onClick={handleSave} color="primary" variant="contained">Сохранить</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default UserAvatar;
