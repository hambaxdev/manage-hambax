import React, { useState } from 'react';
import { Grid, Typography, Button, Divider } from '@mui/material';
import BasicInfoSection from './UserProfileSections/BasicInfoSection';
import ContactInfoSection from './UserProfileSections/ContactInfoSection';
import AddressInfoSection from './UserProfileSections/AddressInfoSection';

const UserProfileForm = ({ profileData, onSave }) => {
    const [formData, setFormData] = useState({
        ...profileData,
        address: profileData?.address || {
            country: '',
            city: '',
            zipCode: '',
            streetName: '',
            houseNumber: '',
            state: '',
        },
        contact: profileData?.contact || {
            phone: '',
            alternatePhone: '',
            website: '',
            email: '',
        },
    });

    const handleChange = (section, key, value) => {
        setFormData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: value,
            },
        }));
    };

    const handleSave = () => {
        onSave(formData);
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h4">User Profile</Typography>
            </Grid>
            <Grid item xs={12}>
                <BasicInfoSection
                    data={formData}
                    onChange={(key, value) => handleChange(null, key, value)}
                />
            </Grid>
            <Divider sx={{ width: '100%', my: 3 }} />
            <Grid item xs={12}>
                <ContactInfoSection
                    data={formData.contact}
                    onChange={(key, value) => handleChange('contact', key, value)}
                />
            </Grid>
            <Divider sx={{ width: '100%', my: 3 }} />
            <Grid item xs={12}>
                <AddressInfoSection
                    data={formData.address}
                    onChange={(key, value) => handleChange('address', key, value)}
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                >
                    Save Changes
                </Button>
            </Grid>
        </Grid>
    );
};

export default UserProfileForm;